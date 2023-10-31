package com.fshoes.core.client.service.impl;

import com.fshoes.core.admin.voucher.repository.AdCustomerVoucherRepository;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.client.model.request.ClientBillDetaillRequest;
import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.core.client.service.ClientCheckoutService;
import com.fshoes.entity.*;
import com.fshoes.infrastructure.constant.MailConstant;
import com.fshoes.infrastructure.email.Email;
import com.fshoes.infrastructure.email.EmailSender;
import com.fshoes.repository.BillDetailRepository;
import com.fshoes.repository.BillHistoryRepository;
import com.fshoes.repository.BillRepository;
import com.fshoes.util.DateUtil;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Calendar;
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
    private AdVoucherRepository voucherRepository;

    @Autowired
    private AdCustomerVoucherRepository customerVoucherRepository;

    @Autowired
    private EmailSender emailSender;

    @Override
    @Transactional
    public Bill thanhToan(ClientCheckoutRequest request) {
        Bill newBill = new Bill();
        if (request.getIdVoucher() == null) {
            newBill.setVoucher(null);
        } else {
            Voucher voucher = voucherRepository.findById(request.getIdVoucher()).orElse(null);
            assert voucher != null;
            voucher.setQuantity(voucher.getQuantity() - 1);
            voucherRepository.save(voucher);
            newBill.setVoucher(voucher);
//            AdCustomerVoucherRespone adCustomerVoucherRespone = voucherRepository.getOneCustomerVoucherByIdVoucherAndIdCustomer(voucher.getId(), request.getIdCustomer());
//            if (adCustomerVoucherRespone != null) {
//                customerVoucherRepository.deleteById(adCustomerVoucherRespone.getId());
//            }
        }
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
        newBill.setMoneyAfter(new BigDecimal(request.getTotalMoney()).add(new BigDecimal(request.getShipMoney())));
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        newBill.setCode("HD" + dateNow);
        newBill.setType(1);
        newBill.setMoneyReduced(new BigDecimal(request.getMoneyReduced()));
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

        StringBuilder htmlTable = new StringBuilder("<table><tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th>");

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

        String valueType = request.getTypePayment().equals("0") ? "Tại quầy" : "Đặt hàng";

        htmlTable.append("</table>");
        String htmlContent = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "body {" +
                "font-family: Arial, sans-serif;" +
                "background-color: #f5f5f5;" +
                "}" +
                ".container {" +
                "background-color: #fff;" +
                "max-width: 800px;" +
                "margin: 0 auto;" +
                "padding: 20px;" +
                "border: 1px solid #ccc;" +
                "border-radius: 5px;" +
                "box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" +
                "}" +
                "h1 {" +
                "color: #333;" +
                "text-align: center;" +
                "}" +
                ".email-container {" +
                "background-color: #fff;" +
                "border: 1px solid #ddd;" +
                "padding: 20px;" +
                "border-radius: 5px;" +
                "box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" +
                "}" +
                "table {" +
                "width: 100%;" +
                "border-collapse: collapse;" +
                "margin-bottom: 20px;" +
                "}" +
                "th {" +
                "border: 1px solid #ddd;" +
                "padding: 8px;" +
                "background-color: #F2741F;" +
                "color: #fff;" +
                "text-align: left;" +
                "}" +
                "td {" +
                "border: 1px solid #ddd;" +
                "padding: 8px;" +
                "}" +
                ".total-section {" +
                "text-align: left;" +
                "float: right;" +
                "}" +
                "p {" +
                "margin-bottom: 10px;" +
                "}" +
                "strong {" +
                "font-weight: bold;" +
                "}" +
                "ul {" +
                "list-style-type: none;" +
                "padding: 0;" +
                "margin: 0;" +
                "}" +
                "li {" +
                "margin-bottom: 5px;" +
                "}" +
                "button {" +
                "background-color: #333;" +
                "color: #fff;" +
                "padding: 10px 20px;" +
                "border: none;" +
                "border-radius: 5px;" +
                "font-size: 16px;" +
                "cursor: pointer;" +
                "display: block;" +
                "margin: 20px auto;" +
                "}" +
                "button:hover {" +
                "background-color: #555;" +
                "}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class=\"container\">" +
                "<h1>Thông Tin Đơn Hàng</h1>" +
                "<div class=\"email-container\">" +
                htmlTable.toString() +
                "        <div class=\"total-section\">" +
                "            <p>Thành tiền: <strong>" + formatCurrency(request.getTotalMoney()) + " VNĐ</strong></p>" +
                "            <p>Phí vận chuyển: <strong>" + formatCurrency(request.getShipMoney()) + " VNĐ</strong></p>" +
                "            <p>Giảm giá: <strong>" + formatCurrency(request.getMoneyReduced()) + " VNĐ</strong></p>" +
                "            <p>Tổng cộng: <strong>" + formatCurrency(String.valueOf(Integer.parseInt(request.getTotalMoney()) + Integer.parseInt(request.getShipMoney()))) + " VNĐ</strong></p>" +
                "        </div>" +
                "<div>" +
                "<p><b>THÔNG TIN ĐƠN HÀNG:</b></p>" +
                "<ul>" +
                "<li>Mã đơn hàng: <strong>" + codeBill + "</strong></li>" +
                "<li>Ngày đặt hàng: <strong>" + DateUtil.converDateTimeString(dateNow) + "</strong></li>" +
                "<li>Ngày nhận dự kiến: <strong>" + DateUtil.converDateTimeString(request.getDuKien()) + "</strong></li>" +
                "<li>Hình thức thanh toán: <strong>" + valueType + "</strong></li>" +
                "</ul>" +
                "<p><b>ĐỊA CHỈ GIAO HÀNG:</b></p>" +
                "<ul>" +
                "<li>Họ và tên: <strong>" + request.getFullName() + "</strong></li>" +
                "<li>Số điện thoại: <strong>" + request.getPhone() + "</strong></li>" +
                "<li>Địa chỉ: <strong>" + request.getAddress() + ", " + request.getXa() + ", " + request.getHuyen() + ", " + request.getTinh() + "</strong></li>" +
                "</ul>" +
                "</div>" +
                "<p>" +
                "Cảm ơn bạn đã tin tưởng và mua hàng tại cửa hàng của chúng tôi. " +
                "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể." +
                "</p>" +
                "</div>" +
                "<a href='http://localhost:3000/home'><button>Xem Chi Tiết</button></a>" +
                "</div>" +
                "</body>" +
                "</html>";

        newEmail.setBody(htmlContent);
        newEmail.setToEmail(toMail);
        newEmail.setSubject("Đơn hàng F-Shoes của bạn " + codeBill);
        newEmail.setTitleEmail("<h1 style=\"text-align: center; color: #333;\">Cảm ơn bạn đã đặt hàng tại F-Shoes</h1>");
        emailSender.sendEmailWithAttachment(newEmail, generateInvoicePDF(request, codeBill, dateNow), codeBill + ".pdf");
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
