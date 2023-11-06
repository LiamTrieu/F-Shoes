package com.fshoes.core.client.service.impl;

import com.fshoes.core.admin.hoadon.repository.HDBillRepository;
import com.fshoes.core.admin.voucher.repository.AdCustomerVoucherRepository;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.client.model.request.ClientBillDetaillRequest;
import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.core.client.repository.ClientBillDetailRepository;
import com.fshoes.core.client.service.ClientCheckoutService;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.*;
import com.fshoes.infrastructure.email.Email;
import com.fshoes.infrastructure.email.EmailSender;
import com.fshoes.infrastructure.vnpay.VNPayConfig;
import com.fshoes.repository.BillHistoryRepository;
import com.fshoes.repository.BillRepository;
import com.fshoes.repository.TransactionRepository;
import com.fshoes.util.DateUtil;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.html.simpleparser.HTMLWorker;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.*;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
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
    private EmailSender emailSender;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private HDBillRepository hdBillRepository;
    @Override
    public Bill thanhToan(ClientCheckoutRequest request, UserLogin userLogin) {
        Bill newBill = new Bill();
        if (request.getIdVoucher() != null) {
            Voucher voucher = voucherRepository.findById(request.getIdVoucher()).orElse(null);
            if (voucher != null) {
                voucher.setQuantity(voucher.getQuantity() - 1);
                voucherRepository.save(voucher);
                newBill.setVoucher(voucher);
            }
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
            messagingTemplate.convertAndSend("/topic/bill-update", hdBillRepository.findBill(newBill.getId()));
        }
        return newBill;
    }

    @Override
    @Transactional
    @Async
    public String createOrder(ClientCheckoutRequest request, UserLogin userLogin) {
        Bill bill = thanhToan(request, userLogin);
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
                    if (bill.getVoucher() != null) {
                        newRequest.setIdVoucher(bill.getVoucher().getId());
                    }
                    newRequest.setMoneyReduced(String.valueOf(bill.getMoneyReduced().intValue()));
                    newRequest.setDuKien(bill.getDesiredReceiptDate());
                    newRequest.setStatus(bill.getStatus());
                    newRequest.setTotalMoney(String.valueOf(bill.getTotalMoney().intValue()));

                    List<BillDetail> listBillDetails = billDetailRepository.findAllByBillId(bill.getId());
                    newRequest.setBillDetail(listBillDetails.stream().map(billDetail ->
                            new ClientBillDetaillRequest(
                                    billDetail.getProductDetail().getProduct().getName() + "" +
                                    billDetail.getProductDetail().getColor().getName() + "" +
                                    billDetail.getProductDetail().getMaterial().getName() + "" +
                                    billDetail.getProductDetail().getSole().getName() + "" +
                                    billDetail.getProductDetail().getCategory().getName() + "" +
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
                    messagingTemplate.convertAndSend("/topic/bill-update", hdBillRepository.findBill(bill.getId()));
                    return listBillDetails.stream().map(BillDetail::getProductDetail).toList();
                }
            }
        }
        return null;
    }

    private void sendMail(ClientCheckoutRequest request, String codeBill, Long dateNow) {
        Email newEmail = new Email();
        String[] toMail = {request.getEmail()};

        StringBuilder htmlTable = new StringBuilder("<table><tr><th style=\"width: 70%\">Tên sản phẩm</th><th style=\"width: 10%\">Số lượng</th><th style=\"width: 20%\">Giá tiền</th>");

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

    public String removeDiacritics(String input) {
        String result = Normalizer.normalize(input, Normalizer.Form.NFKD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return result;
    }

    public FileSystemResource generateInvoicePDF(ClientCheckoutRequest request, String code, Long dateNow) {
        String htmlContent = "<html lang=\"en\">"
                             + "<head>"
                             + "<meta charset=\"UTF-8\">"
                             + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                             + "</head>"
                             + "<body style=\"font-family: 'Arial Unicode MS', Arial, sans-serif; background-color: #f5f5f5\">"
                             + "<div style=\"background-color: #fff; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">"
                             + "<h1 style=\"color: #333; text-align: center;\">THONG TIN DON HANG</h1>"
                             + "<div style=\"background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\">"
                             + "<table border=\"1\" style=\"width: 100%; border-collapse: collapse; margin-bottom: 20px;\">"
                             + "<tr>" +
                             "<th style=\"width: 70%\">Ten san pham</th>" +
                             "<th style=\"width: 10%\">So luong</th>" +
                             "<th style=\"width: 20%\">Gia tien</th>";

        for (ClientBillDetaillRequest detail : request.getBillDetail()) {
            int totalPrice = Integer.parseInt(detail.getPrice()) * detail.getQuantity();
            String formattedPrice = String.format("%,d VND", totalPrice);

            htmlContent += "<tr><td style=\"border: 1px solid #ddd; padding: 8px;\">"
                           + removeDiacritics(detail.getNameProduct()).replaceAll("[^a-zA-Z0-9 ]", "")
                           + "</td><td style=\"border: 1px solid #ddd; padding: 8px;\">"
                           + detail.getQuantity()
                           + "</td><td style=\"border: 1px solid #ddd; padding: 8px;\">"
                           + formattedPrice + ""
                           + "</td></tr>";
        }
        String valueType = request.getTypePayment().equals("0") ? "Tại quầy" : "Đặt hàng";

        htmlContent += "</table>"
                       + "<div>"
                       + "<p style=\"margin-bottom: 10px;\">Thanh tien: <strong style=\"font-weight: bold;\">" + formatCurrency(request.getTotalMoney()) + " VND</strong></p>"
                       + "<p style=\"margin-bottom: 10px;\">Phi van chuyen: <strong style=\"font-weight: bold;\">" + formatCurrency(request.getShipMoney()) + " VND</strong></p>"
                       + "<p style=\"margin-bottom: 10px;\">Giam gia: <strong style=\"font-weight: bold;\">" + formatCurrency(request.getMoneyReduced()) + " VND</strong></p>"
                       + "<p style=\"margin-bottom: 10px;\">Tong cong: <strong style=\"font-weight: bold;\">" + formatCurrency(String.valueOf(Integer.parseInt(request.getTotalMoney()) + Integer.parseInt(request.getShipMoney()))) + " VND</strong></p>"
                       + "</div>"
                       + "<div>"
                       + "<p style=\"margin-bottom: 10px;\"><b>THONG TIN DON HANG:</b></p>"
                       + "<ul style=\"list-style-type: none; padding: 0; margin: 0;\">"
                       + "<li style=\"margin-bottom: 5px;\">Ma don hang: <strong style=\"font-weight: bold;\">" + code + "</strong></li>"
                       + "<li style=\"margin-bottom: 5px;\">Ngay dat hang: <strong style=\"font-weight: bold;\">" + DateUtil.converDateTimeString(dateNow) + "</strong></li>"
                       + "<li style=\"margin-bottom: 5px;\">Ngay nhan du kien: <strong style=\"font-weight: bold;\">" + DateUtil.converDateTimeString(request.getDuKien()) + "</strong></li>"
                       + "<li style=\"margin-bottom: 5px;\">Hinh thuc thanh toan: <strong style=\"font-weight: bold;\">" + removeDiacritics(valueType).replaceAll("[^a-zA-Z0-9 ]", "") + "</strong></li>"
                       + "</ul>"
                       + "<p style=\"margin-bottom: 10px;\"><b>DIA CHI GIAO HANG:</b></p>"
                       + "<ul style=\"list-style-type: none; padding: 0; margin: 0;\">"
                       + "<li style=\"margin-bottom: 5px;\">Ho va ten: <strong style=\"font-weight: bold;\">" + removeDiacritics(request.getFullName()).replaceAll("[^a-zA-Z0-9 ]", "") + "</strong></li>"
                       + "<li style=\"margin-bottom: 5px;\">So dien thoai: <strong style=\"font-weight: bold;\">" + removeDiacritics(request.getPhone()).replaceAll("[^a-zA-Z0-9 ]", "") + "</strong></li>"
                       + "<li style=\"margin-bottom: 5px;\">Dia chi: <strong style=\"font-weight: bold;\">" + removeDiacritics(request.getAddress() + ", " + request.getXa() + ", " + request.getHuyen() + ", " + request.getTinh()).replaceAll("[^a-zA-Z0-9 ]", "")
                       + "</strong></li>"
                       + "</ul>"
                       + "</div>"
                       + "<p style=\"margin-bottom: 10px;\">"
                       + "Cam on ban da tin tuong va mua hang tai cua hang cua chung toi. "
                       + "Chung toi se som lien he voi ban som nhat co the."
                       + "</p>"
                       + "</div>"
                       + "</body></html>";
        FileSystemResource fileResource = null;
        try {
            Document document = new Document(PageSize.A4);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            document.open();

            HTMLWorker htmlWorker = new HTMLWorker(document);
            htmlWorker.parse(new StringReader(htmlContent));

            document.close();

            byte[] pdfBytes = outputStream.toByteArray();

            String filePath = code + ".pdf";
            File pdfFile = new File(filePath);
            FileOutputStream fileOutputStream = new FileOutputStream(pdfFile);
            fileOutputStream.write(pdfBytes);
            fileResource = new FileSystemResource(pdfFile);
            fileOutputStream.close();

        } catch (IOException | DocumentException e) {
            e.printStackTrace();
        }
        return fileResource;
    }

}