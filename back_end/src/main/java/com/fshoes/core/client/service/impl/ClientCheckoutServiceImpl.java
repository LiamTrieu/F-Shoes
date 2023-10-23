package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientBillDetaillRequest;
import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.core.client.service.ClientCheckoutService;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.ProductDetail;
import com.fshoes.infrastructure.constant.MailConstant;
import com.fshoes.infrastructure.email.Email;
import com.fshoes.infrastructure.email.EmailSender;
import com.fshoes.repository.BillDetailRepository;
import com.fshoes.repository.BillHistoryRepository;
import com.fshoes.repository.BillRepository;
import com.fshoes.util.DateUtil;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileOutputStream;
import java.util.List;

@Service
public class ClientCheckoutServiceImpl implements ClientCheckoutService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Autowired
    private EmailSender emailSender;

    @Override
    @Transactional
    public Bill thanhToan(ClientCheckoutRequest request) {
        Bill newBill = new Bill();
        newBill.setStatus(1);
        newBill.setNote(request.getNote());
        newBill.setFullName(request.getFullName());
        newBill.setPhoneNumber(request.getPhone());
        StringBuilder diaChi = new StringBuilder();
        newBill.setAddress(diaChi.append(request.getAddress())
                .append(", ")
                .append(request.getXa())
                .append(", ")
                .append(request.getHuyen())
                .append(", ")
                .append(request.getTinh())
                .toString());
        newBill.setTotalMoney(new BigDecimal(request.getTotalMoney()));
        newBill.setMoneyAfter(new BigDecimal(request.getTotalMoney()));
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        newBill.setCode("HD" + dateNow);
        newBill.setType(1);
        newBill.setMoneyReduced(BigDecimal.ZERO);
        newBill.setMoneyShip(new BigDecimal(request.getShipMoney()));
        newBill.setDesiredReceiptDate(request.getDuKien());
        billRepository.save(newBill);
        List<BillDetail> billDetails = request.getBillDetail().stream().map(bd -> {
            BillDetail billDetail = new BillDetail();
            billDetail.setBill(newBill);
            billDetail.setQuantity(bd.getQuantity());
            billDetail.setStatus(0);
            billDetail.setPrice(new BigDecimal(bd.getPrice()));
            ProductDetail productDetail = new ProductDetail();
            productDetail.setId(bd.getIdProduct());
            billDetail.setProductDetail(productDetail);
            return billDetail;
        }).toList();
        billDetailRepository.saveAll(billDetails);
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(newBill);
        billHistory.setStatusBill(newBill.getStatus());
        billHistory.setNote(request.getNote());
        billHistoryRepository.save(billHistory);
        sendMail(request, newBill.getCode(), dateNow);
        return newBill;
    }

    private void sendMail(ClientCheckoutRequest request, String codeBill, Long dateNow) {
        Email newEmail = new Email();
        String[] toMail = {request.getEmail()};
        StringBuilder htmlTable = new StringBuilder("<table style=\"width: 100%; border-collapse: collapse; margin-bottom: 20px;\">");
        htmlTable.append("<tr><th style=\"border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;\">Tên sản phẩm</th>" +
                         "<th style=\"border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;\">Số lượng</th>" +
                         "<th style=\"border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;\">Giá tiền</th></tr>");

        for (ClientBillDetaillRequest detail : request.getBillDetail()) {
            int totalPrice = Integer.parseInt(detail.getPrice()) * detail.getQuantity();
            String formattedPrice = String.format("%,d VNĐ", totalPrice);

            htmlTable.append("<tr><td style=\"border: 1px solid #ddd; padding: 8px;\">")
                    .append(detail.getNameProduct())
                    .append("</td><td style=\"border: 1px solid #ddd; padding: 8px;\">")
                    .append(detail.getQuantity())
                    .append("</td><td style=\"border: 1px solid #ddd; padding: 8px;\">")
                    .append(formattedPrice)
                    .append("</td></tr>");
        }

        htmlTable.append("</table>");
        newEmail.setBody("<div style=\"font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;\">\n" +
                         "\n" +
                         "        <div style=\"background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);\">\n" +
                         "\n" +
                         "            " + htmlTable + "\n" +
                         "\n" +
                         "<div>" +
                         "<div style=\"text-align: left; float:right;\">\n" +
                         "    <p>Thành tiền: <strong>" + formatCurrency(request.getTotalMoney()) + " VNĐ</strong></p>\n" +
                         "    <p>Phí vận chuyển: <strong>" + formatCurrency(request.getShipMoney()) + " VNĐ</strong></p>\n" +
                         "    <p>Giảm giá: <strong>" + formatCurrency("0") + " VNĐ</strong></p>\n" +
                         "    <p>Tổng cộng: <strong>" + formatCurrency(String.valueOf(Integer.parseInt(request.getTotalMoney()) + Integer.parseInt(request.getShipMoney()))) + " VNĐ</strong></p>\n" +
                         "</div>"
                         +
                         "</div>\n" +
                         "<div>" +
                         "            <p style=\"margin-bottom: 10px;\"><b>THÔNG TIN ĐƠN HÀNG:</b></p>\n" +
                         "\n" +
                         "            <ul style=\"list-style-type: none; padding: 0;\">\n" +
                         "                <li style=\"margin-bottom: 5px;\">Mã đơn hàng: <strong>" + codeBill + "</strong></li>\n" +
                         "                <li style=\"margin-bottom: 5px;\">Ngày đặt hàng: <strong>" + DateUtil.converDateTimeString(dateNow) + "</strong></li>\n" +
                         "                <li style=\"margin-bottom: 5px;\">Ngày nhận dự kiến: <strong>" + DateUtil.converDateTimeString(request.getDuKien()) + "</strong></li>\n" +
                         "                <li style=\"margin-bottom: 5px;\">Hình thức thanh toán: <strong>Thanh toán khi nhận hàng</strong></li>\n" +
                         "            </ul>\n" +
                         "\n" + "            <p style=\"margin-bottom: 10px;\"><b>ĐỊA CHỈ GIAO HÀNG:</b></p>\n" +
                         "\n" +
                         "            <ul style=\"list-style-type: none; padding: 0;\">\n" +
                         "                <li style=\"margin-bottom: 5px;\">Họ và tên: <strong>" + request.getFullName() + "</strong></li>\n" +
                         "                <li style=\"margin-bottom: 5px;\">Số điện thoại: <strong>" + request.getPhone() + "</strong></li>\n" +
                         "                <li style=\"margin-bottom: 5px;\">Địa chỉ: <strong>" + request.getAddress() + ", " + request.getXa() + ", " + request.getHuyen() + ", " + request.getTinh() + "</strong></li>\n" +
                         "            </ul>\n" +
                         "\n" +
                         "</div>" +
                         "            <p>Cảm ơn bạn đã tin tưởng và mua hàng tại cửa hàng của chúng tôi. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>\n" +
                         "\n" +
                         "        </div>\n" +
                         "\n" +
                         "    </div>");
        newEmail.setToEmail(toMail);
        newEmail.setSubject("Đơn hàng F-Shoes của bạn " + codeBill);
        newEmail.setTitleEmail("<h1 style=\"text-align: center; color: #333;\">Cảm ơn bạn đã đặt hàng tại F-Shoes</h1>");
        emailSender.sendEmailWithAttachment(newEmail, generateInvoicePDF(request, codeBill, dateNow), codeBill+".pdf");
    }

    private String formatCurrency(String amount) {
        int amountInt = Integer.parseInt(amount);
        return String.format("%,d", amountInt);
    }

    public FileSystemResource generateInvoicePDF(ClientCheckoutRequest request, String code, Long dateNow) {
        FileSystemResource fileResource = null;
        try {
            BaseFont unicode = BaseFont.createFont(MailConstant.FONT_INVOICE, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font font = new Font(unicode, 12);
            Document document = new Document();
            String filePath = code + ".pdf";

            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();

            // Header Section
            document.add(new Paragraph("Mã hóa đơn: " + code, font));
            document.add(new Paragraph("Ngày đặt hàng: " + DateUtil.converDateTimeString(dateNow), font));
            document.add(new Paragraph("Ngày nhận dự kiến: " + DateUtil.converDateTimeString(request.getDuKien()), font));
            document.add(new Paragraph("Hình thức thanh toán: Thanh toán khi nhận hàng", font));

            // Receiver Information
            document.add(new Paragraph("Thông tin người nhận hàng:", font));
            document.add(new Paragraph("Họ và tên: " + request.getFullName(), font));
            document.add(new Paragraph("Số điện thoại: " + request.getPhone(), font));
            document.add(new Paragraph("Địa chỉ: " + request.getAddress() + ", " + request.getXa() + ", " + request.getHuyen() + ", " + request.getTinh(), font));

            // Table Section
            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            PdfPCell cell1 = new PdfPCell(new Phrase("Sản phẩm", font));
            PdfPCell cell2 = new PdfPCell(new Phrase("Số lượng", font));
            PdfPCell cell3 = new PdfPCell(new Phrase("Giá tiền", font));

            table.addCell(cell1);
            table.addCell(cell2);
            table.addCell(cell3);

            List<ClientBillDetaillRequest> billDetails = request.getBillDetail();

            for (ClientBillDetaillRequest detail : billDetails) {
                table.addCell(new Phrase(detail.getNameProduct(), font));
                table.addCell(new Phrase(String.valueOf(detail.getQuantity()), font));
                table.addCell(new Phrase(formatCurrency(detail.getPrice()), font));
            }

            document.add(table);

            // Total Section
            document.add(new Paragraph("Thành tiền: " + formatCurrency(request.getTotalMoney()) + " VND", font));
            document.add(new Paragraph("Phí vận chuyển: " + formatCurrency(request.getShipMoney()) + " VND", font));
            document.add(new Paragraph("Giảm giá: 0 VND", font));
            document.add(new Paragraph("Tổng cộng: " + formatCurrency(String.valueOf(
                    Integer.parseInt(request.getTotalMoney()) + Integer.parseInt(request.getShipMoney())
            )) + " VND", font));

            document.close();

            File pdfFile = new File(filePath);
            fileResource = new FileSystemResource(pdfFile);

        } catch (IOException | DocumentException e) {
            e.printStackTrace();
        }
        return fileResource;
    }

}
