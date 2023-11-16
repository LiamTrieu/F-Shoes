package com.fshoes.util;

import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.infrastructure.constant.MailConstant;
import com.fshoes.repository.ProductDetailRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;

@Component
public class GenHoaDon {
    @Autowired
    private ProductDetailRepository productDetailRepository;

    public File genHoaDon(Bill bill, List<BillDetail> billDetails) {
        Document document = new Document();
        File pdfFile = null;

        try {
            pdfFile = new File(bill.getCode() + ".pdf");
            PdfWriter.getInstance(document, new FileOutputStream(pdfFile));
            document.open();

            BaseFont unicodeFont = BaseFont.createFont(MailConstant.FONT_INVOICE, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font titleFont = new Font(unicodeFont, 25, Font.BOLD);
            Font headerFont = new Font(unicodeFont, 12, Font.BOLD);
            Font normalFont = new Font(unicodeFont, 12);

            ClassPathResource resource = new ClassPathResource(MailConstant.LOGO_PATH);
            Image img = Image.getInstance(resource.getURL());
            float pageWidth = document.getPageSize().getWidth();
            float pageHeight = document.getPageSize().getHeight();
            float imageWidth = img.getWidth();
            float imageHeight = img.getHeight();
            float aspectRatio = imageWidth / imageHeight;
            float newWidth = 500;
            float newHeight = newWidth / aspectRatio;

            // Đặt vị trí và kích thước mới cho ảnh
            float x = (pageWidth - newWidth) / 2;
            float y = (pageHeight - newHeight) / 2;

            img.setAbsolutePosition(x, y);
            img.scaleAbsolute(newWidth, newHeight);

            // Thêm ảnh vào tài liệu
            document.add(img);

            // Đầu trang: F-Shoes, Số điện thoại, Email, Địa chỉ, QR Code
            Paragraph fShoes = new Paragraph("F-Shoes", titleFont);
            fShoes.setAlignment(Element.ALIGN_CENTER);
            fShoes.setSpacingAfter(10f);
            document.add(fShoes);

            Paragraph contactInfo = new Paragraph("Số điện thoại: 0123456789", normalFont);
            Paragraph contactInfo2 = new Paragraph("Email: fshoesweb@gmail.com", normalFont);
            Paragraph contactInfo3 = new Paragraph("Địa chỉ: FPT POLYTECHNIC Cơ Sở Kiều Mai Tunzo, P. Kiều Mai, Phúc Diễn, Từ Liêm, Hà Nội", normalFont);
            contactInfo.setAlignment(Element.ALIGN_CENTER);
            contactInfo2.setAlignment(Element.ALIGN_CENTER);
            contactInfo3.setAlignment(Element.ALIGN_CENTER);
            document.add(contactInfo);
            document.add(contactInfo2);
            document.add(contactInfo3);

            // Tạo mã QR Code và thêm vào tài liệu
            BarcodeQRCode qrcode = new BarcodeQRCode(bill.getCode(), 1, 1, null);
            Image qrcodeImage = qrcode.getImage();
            qrcodeImage.scaleAbsolute(100, 100);  // Điều chỉnh kích thước của mã QR Code
            qrcodeImage.setAbsolutePosition(30, 700);
            document.add(qrcodeImage);

            // Thêm dòng trống
            document.add(new Paragraph(""));

            // Thông tin hóa đơn
            Paragraph invoiceHeader = new Paragraph("HÓA ĐƠN BÁN HÀNG", new Font(unicodeFont, 20, Font.BOLD));
            invoiceHeader.setAlignment(Element.ALIGN_CENTER);
            invoiceHeader.setSpacingBefore(10f);
            invoiceHeader.setSpacingAfter(10f);
            document.add(invoiceHeader);

            PdfPTable invoiceTable = new PdfPTable(2);
            invoiceTable.setWidthPercentage(100);

            PdfPCell cell3 = new PdfPCell(new Paragraph("Tên khách hàng: " + bill.getFullName(), normalFont));
            cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell3.setBorder(Rectangle.NO_BORDER);
            invoiceTable.addCell(cell3);
            PdfPCell cell1 = new PdfPCell(new Paragraph("Mã Hóa Đơn: " + bill.getCode(), normalFont));
            cell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell1.setBorder(Rectangle.NO_BORDER);
            invoiceTable.addCell(cell1);
            PdfPCell cell4 = new PdfPCell(new Paragraph("Địa chỉ: " + bill.getAddress(), normalFont));
            cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell4.setBorder(Rectangle.NO_BORDER);
            invoiceTable.addCell(cell4);

            PdfPCell cell2 = new PdfPCell(new Paragraph("Ngày tạo: " + DateUtil.converDateTimeString(bill.getCreatedAt()), normalFont));
            cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell2.setBorder(Rectangle.NO_BORDER);
            invoiceTable.addCell(cell2);

            PdfPCell cell5 = new PdfPCell(new Paragraph("Nhân viên: Nhân viên ABC", normalFont));
            cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell5.setBorder(Rectangle.NO_BORDER);
            invoiceTable.addCell(cell5);
            PdfPCell cell6 = new PdfPCell(new Paragraph("", normalFont));
            cell6.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell6.setBorder(Rectangle.NO_BORDER);
            invoiceTable.addCell(cell6);

            // Thêm bảng vào tài liệu
            document.add(invoiceTable);

            Paragraph invoiceHeader2 = new Paragraph("DANH SÁCH SẢN PHẨM", new Font(unicodeFont, 15, Font.BOLD));
            invoiceHeader2.setAlignment(Element.ALIGN_CENTER);
            invoiceHeader2.setSpacingBefore(5f);
            invoiceHeader2.setSpacingAfter(5f);
            document.add(invoiceHeader2);
            // Thêm bảng sản phẩm
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            DecimalFormat decimalFormat = new DecimalFormat("###,###.## VND");
            int sttCounter = 1;
            for (BillDetail billDetail : billDetails) {

                PdfPCell cell = new PdfPCell(new Phrase("STT", headerFont));
                table.addCell(cell);

                cell = new PdfPCell(new Phrase("Tên sản phẩm", headerFont));
                table.addCell(cell);

                cell = new PdfPCell(new Phrase("Số lượng", headerFont));
                table.addCell(cell);

                cell = new PdfPCell(new Phrase("Đơn giá", headerFont));
                table.addCell(cell);

                cell = new PdfPCell(new Phrase("Thành tiền", headerFont));
                table.addCell(cell);

                // Thêm dữ liệu sản phẩm
                table.addCell(String.valueOf(sttCounter));
                table.addCell(productDetailRepository.getName(billDetail.getProductDetail().getId()));
                table.addCell(String.valueOf(billDetail.getQuantity()));
                table.addCell(decimalFormat.format(billDetail.getPrice()));
                table.addCell(decimalFormat.format(billDetail.getPrice().multiply(BigDecimal.valueOf(billDetail.getQuantity()))));
                sttCounter++;
            }


            // Thêm bảng vào tài liệu
            document.add(table);

            // Thêm tổng cộng
            PdfPTable invoiceTable3 = new PdfPTable(2);
            invoiceTable3.setWidthPercentage(100);

            PdfPCell totalcell = new PdfPCell(new Paragraph("Tổng tiền hàng:", normalFont));
            totalcell.setHorizontalAlignment(Element.ALIGN_LEFT);
            totalcell.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell);
            PdfPCell totalcell2 = new PdfPCell(new Paragraph(decimalFormat.format(bill.getTotalMoney()), headerFont));
            totalcell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalcell2.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell2);

            PdfPCell totalcell3 = new PdfPCell(new Paragraph("Giảm giá:", normalFont));
            totalcell3.setHorizontalAlignment(Element.ALIGN_LEFT);
            totalcell3.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell3);
            PdfPCell totalcell4 = new PdfPCell(new Paragraph(decimalFormat.format(bill.getMoneyReduced()), headerFont));
            totalcell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalcell4.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell4);

            PdfPCell totalcell5 = new PdfPCell(new Paragraph("Phí giao hàng:", normalFont));
            totalcell5.setHorizontalAlignment(Element.ALIGN_LEFT);
            totalcell5.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell5);
            PdfPCell totalcell6 = new PdfPCell(new Paragraph(decimalFormat.format(bill.getMoneyShip()), headerFont));
            totalcell6.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalcell6.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell6);

            PdfPCell totalcell7 = new PdfPCell(new Paragraph("Tổng tiền cần thanh toán:", normalFont));
            totalcell7.setHorizontalAlignment(Element.ALIGN_LEFT);
            totalcell7.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell7);
            PdfPCell totalcell8 = new PdfPCell(new Paragraph(decimalFormat.format(bill.getMoneyAfter()), headerFont));
            totalcell8.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalcell8.setBorder(Rectangle.NO_BORDER);
            invoiceTable3.addCell(totalcell8);
            document.add(invoiceTable3);

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
        return pdfFile;
    }
}
