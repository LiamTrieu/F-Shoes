package com.fshoes.core.client.service.impl;

import com.fshoes.core.admin.voucher.repository.AdCustomerVoucherRepository;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.client.model.request.ClientBillDetaillRequest;
import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.core.client.repository.ClientBillDetailRepository;
import com.fshoes.core.client.service.ClientCheckoutService;
import com.fshoes.entity.*;
import com.fshoes.infrastructure.constant.MailConstant;
import com.fshoes.infrastructure.email.Email;
import com.fshoes.infrastructure.email.EmailSender;
import com.fshoes.infrastructure.vnpay.VNPayConfig;
import com.fshoes.repository.BillHistoryRepository;
import com.fshoes.repository.BillRepository;
import com.fshoes.repository.TransactionRepository;
import com.fshoes.util.DateUtil;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.*;

@Service
public class ClientCheckoutServiceImpl implements ClientCheckoutService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ClientBillDetailRepository billDetailRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Autowired
    private TransactionRepository transactionRepository;

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
        newBill.setStatus(request.getStatus());
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
        newBill.setEmail(request.getEmail());
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
        if (request.getStatus() == 1) {
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(newBill);
            billHistory.setStatusBill(newBill.getStatus());
            billHistory.setNote(request.getNote());
            billHistoryRepository.save(billHistory);
            sendMail(request, newBill.getCode(), dateNow);
        }
        return newBill;
    }

    @Override
    @Transactional
    @Async
    public String createOrder(ClientCheckoutRequest request) {
        Bill bill = thanhToan(request);
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = bill.getCode();
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String orderType = "order-type";

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(bill.getMoneyAfter().multiply(BigDecimal.valueOf(100))));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", bill.getId());
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        vnp_Params.put("vnp_ReturnUrl", "http://localhost:3000" + VNPayConfig.vnp_Returnurl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        return VNPayConfig.vnp_PayUrl + "?" + queryUrl;
    }

    @Override
    public List<ProductDetail> orderReturn(HttpServletRequest request) {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VNPayConfig.hashAllFields(fields);
        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(request.getParameter("vnp_TransactionStatus"))) {
                Bill bill = billRepository.findById((String) fields.get("vnp_OrderInfo")).orElse(null);
                if (bill != null && bill.getStatus() == 8) {
                    bill.setStatus(1);
                    billRepository.save(bill);
                    Transaction transaction = new Transaction();
                    transaction.setTransactionCode((String) fields.get("vnp_BankTranNo"));
                    transaction.setBill(bill);
                    transaction.setType(0);
                    transaction.setTotalMoney(bill.getMoneyAfter());
                    transaction.setPaymentMethod(0);
                    transaction.setStatus(0);
                    transactionRepository.save(transaction);
                    ClientCheckoutRequest newRequest = new ClientCheckoutRequest();
                    newRequest.setFullName(bill.getFullName());
                    newRequest.setEmail(bill.getEmail());
                    newRequest.setPhone(bill.getPhoneNumber());
                    String[] arrAddress = bill.getAddress().split(",");
                    newRequest.setAddress(arrAddress[0]);
                    newRequest.setXa(arrAddress[1]);
                    newRequest.setHuyen(arrAddress[2]);
                    newRequest.setTinh(arrAddress[3]);
                    newRequest.setNote(bill.getNote());
                    newRequest.setShipMoney(String.valueOf(bill.getMoneyShip().intValue()));
                    newRequest.setTypePayment("1");
                    if (bill.getVoucher() != null){
                        newRequest.setIdVoucher(bill.getVoucher().getId());
                    }
                    newRequest.setMoneyReduced(String.valueOf(bill.getMoneyReduced().intValue()));
                    newRequest.setDuKien(bill.getDesiredReceiptDate());
                    newRequest.setStatus(bill.getStatus());
                    newRequest.setTotalMoney(String.valueOf(bill.getTotalMoney().intValue()));

                    List<BillDetail> listBillDetails = billDetailRepository.findAllByBillId(bill.getId());
                    newRequest.setBillDetail(listBillDetails.stream().map(billDetail ->
                            new ClientBillDetaillRequest(
                                    billDetail.getProductDetail().getProduct().getName() +
                                    billDetail.getProductDetail().getColor().getName() +
                                    billDetail.getProductDetail().getMaterial().getName() +
                                    billDetail.getProductDetail().getSole().getName() +
                                    billDetail.getProductDetail().getCategory().getName() +
                                    billDetail.getProductDetail().getBrand().getName(),
                                    billDetail.getProductDetail().getId(),
                                    billDetail.getQuantity(), String.valueOf(billDetail.getPrice().intValue()))
                    ).toList());
                    BillHistory billHistory = new BillHistory();
                    billHistory.setBill(bill);
                    billHistory.setStatusBill(bill.getStatus());
                    billHistory.setNote(bill.getNote());
                    billHistoryRepository.save(billHistory);
                    sendMail(newRequest, bill.getCode(), Calendar.getInstance().getTimeInMillis());
                    return listBillDetails.stream().map(BillDetail::getProductDetail).toList();
                }
            }
        }
        return null;
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
