package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.BillConfirmRequest;
import com.fshoes.core.admin.hoadon.model.request.BillFilterRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillHistoryRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.model.request.HDConfirmPaymentRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepository;
import com.fshoes.core.admin.hoadon.service.HDBillHistoryService;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.entity.Account;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.ProductDetail;
import com.fshoes.entity.Transaction;
import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.infrastructure.constant.TypeBill;
import com.fshoes.repository.AccountRepository;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.TransactionRepository;
import com.fshoes.repository.VoucherRepository;
import com.fshoes.util.DateUtil;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class HDBillServiceImpl implements HDBillService {
    @Autowired
    private HDBillRepository hdBillRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private HDBillHistoryRepository hdBillHistoryRepository;

    @Autowired
    private HDBillDetailRepository hdBillDetailRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    @Autowired
    private HDBillHistoryService hdBillHistoryService;

    @Override
    public Page<HDBillResponse> filterBill(BillFilterRequest billFilterRequest) {
        Boolean type;
        Integer status;
        if (StringUtils.isNumeric(billFilterRequest.getStatus())) {
            status = Integer.valueOf(billFilterRequest.getStatus());
        } else {
            status = null;
        }
        if (!billFilterRequest.getType().equalsIgnoreCase("true") && !billFilterRequest.getType().equalsIgnoreCase("false")) {
            type = null;
        } else {
            type = Boolean.valueOf(billFilterRequest.getType());
        }
        Long startDate;
        Long endDate;
        try {
            startDate = DateUtil.parseDateLong(billFilterRequest.getStartDate());
        } catch (Exception exception) {
            startDate = null;
        }
        try {
            endDate = DateUtil.parseDateLong(billFilterRequest.getEndDate());
        } catch (Exception exception) {
            endDate = null;
        }
        Pageable pageable = PageRequest.of(billFilterRequest.getPage() > 0 ? billFilterRequest.getPage() - 1 : billFilterRequest.getPage(), billFilterRequest.getSize());

        return hdBillRepository.filterBill(pageable, status, startDate, endDate, type, billFilterRequest.getInputSearch());
    }

    //staff create bill - type = 0: tại quầy, 1: qua web
    @Override
    public Bill createBill() {
        Bill billCreat = Bill.builder()
                .code(generateUniqueBillCode())
                .status(StatusBill.CHO_XAC_NHAN)
                .type(TypeBill.TAI_QUAY)
                .build();
        Bill bill = hdBillRepository.save(billCreat);

        //thêm bill history khi tạo hoá đơn - trạng thái: chờ xác nhận
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill);
        billHistory.setStatusBill(bill.getStatus());
        hdBillHistoryRepository.save(billHistory);

        return bill;

    }

    @Transactional
    @Override
    public Bill updateBill(String idBill, HDBillRequest hdBillRequest) {
        try {
            Bill bill = hdBillRepository.findById(idBill).orElseThrow(() -> new RuntimeException("khong tim thay bill co id: " + idBill));
            if (hdBillRequest.getIdVoucher() == null || !voucherRepository.existsById(hdBillRequest.getIdVoucher())) {
                bill.setVoucher(null);
            } else {
                Voucher voucher = voucherRepository.findById(hdBillRequest.getIdVoucher()).orElse(null);
                bill.setVoucher(voucher);
            }
            if (hdBillRequest.getIdCustomer() == null) {
                bill.setCustomer(null);
            } else {
                Account customer = accountRepository.findById(hdBillRequest.getIdCustomer()).orElse(null);
                bill.setCustomer(customer);
            }
            bill.setFullName(hdBillRequest.getFullName());
            bill.setPhoneNumber(hdBillRequest.getPhoneNumber());
            bill.setAddress(hdBillRequest.getAddress());
            bill.setNote(hdBillRequest.getNote());
            bill.setStatus(hdBillRequest.getStatus());
            //thêm history:
            HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                    .bill(bill)
                    .idStaff(hdBillRequest.getIdStaff())
                    .note(hdBillRequest.getNoteBillHistory())
                    .build();
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill);
            billHistory.setNote(hdBillHistoryRequest.getNote());
            billHistory.setAccount(accountRepository.findById(hdBillHistoryRequest.getIdStaff()).orElse(null));
            hdBillHistoryRepository.save(billHistory);
            return hdBillRepository.save(bill);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Account accFake() {
        return accountRepository.findAll().get(0);
    }

    @Transactional
    @Override
    public Boolean cancelOrder(String idBill, HDBillRequest hdBillRequest) {
        Bill bill = hdBillRepository.findById(idBill).orElse(null);
        if (hdBillRepository.existsById(idBill)) {
            try {
                if (!hdBillRequest.getNoteBillHistory().trim().isEmpty()) {
                    if (bill != null) {
                        bill.setStatus(0);
                        HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                                .note(hdBillRequest.getNoteBillHistory())
                                .idStaff(accFake().getId())
                                .bill(bill)
                                .build();
                        BillHistory billHistory = new BillHistory();
                        billHistory.setBill(bill);
                        billHistory.setStatusBill(0);
                        billHistory.setNote(hdBillHistoryRequest.getNote());
                        billHistory.setAccount(accountRepository.findById(hdBillHistoryRequest.getIdStaff()).orElse(null));
                        billHistory.setAccount(accFake());
                        hdBillHistoryRepository.save(billHistory);
                        hdBillRepository.save(bill);
                    }
                }
            } catch (Exception exception) {
                return false;
            }
            return true;
        } else {
            return false;
        }

    }

    @Transactional
    @Override
    public Bill confirmOrder(String idBill, BillConfirmRequest billConfirmRequest) {
        Bill bill = hdBillRepository.findById(idBill).orElse(null);

        if (bill != null && bill.getStatus() == 1) {

            // Xóa tất cả chi tiết hóa đơn đã có:
            hdBillDetailRepository.deleteByBillId(idBill);
            // Xử lý danh sách chi tiết hóa đơn mới
            List<BillDetail> newBillDetails = billConfirmRequest.getListHdctReq().stream()
                    .map((hdBillDetailRequest) -> {
                        ProductDetail productDetail = productDetailRepository.findById(hdBillDetailRequest.getProductDetailId()).get();
                        if (productDetail.getAmount() >= hdBillDetailRequest.getQuantity()) {
                            BigDecimal price = hdBillDetailRequest.getPrice();
                            int quantity = hdBillDetailRequest.getQuantity();
                            BillDetail billDetail = new BillDetail();
                            billDetail.setBill(bill);
                            billDetail.setProductDetail(productDetailRepository.findById(hdBillDetailRequest.getProductDetailId()).orElse(null));
                            billDetail.setPrice(price);
                            billDetail.setQuantity(quantity);
                            billDetail.setStatus(hdBillDetailRequest.getStatus());
                            productDetail.setAmount(productDetail.getAmount() - hdBillDetailRequest.getQuantity());
                            productDetailRepository.save(productDetail);
                            return billDetail;
                        } else {
                            return null;
                        }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());


            BigDecimal totalMoney = BigDecimal.ZERO;
            for (BillDetail detail : newBillDetails) {
                totalMoney = totalMoney.add(detail.getPrice().multiply(BigDecimal.valueOf(detail.getQuantity())));
            }
            // Lưu danh sách chi tiết hóa đơn mới vào cơ sở dữ liệu
            hdBillDetailRepository.saveAll(newBillDetails);

            // Cập nhật thông tin hóa đơn và trạng thái
            bill.setStatus(2);
            bill.setVoucher(billConfirmRequest.getIdVoucher() != null ? voucherRepository.findById(billConfirmRequest.getIdVoucher()).orElse(null) : null);
            bill.setCustomer(billConfirmRequest.getIdCustomer() != null ? accountRepository.findById(billConfirmRequest.getIdCustomer()).orElse(null) : null);
            bill.setFullName(billConfirmRequest.getFullName());
            bill.setNote(billConfirmRequest.getNote());
            bill.setAddress(billConfirmRequest.getAddress());
            bill.setPhoneNumber(billConfirmRequest.getPhoneNumber());
            bill.setConfirmationDate(Calendar.getInstance().getTimeInMillis());
            bill.setTotalMoney(totalMoney);
            bill.setConfirmationDate(DateUtil.getCurrentTimeNow());
            hdBillRepository.save(bill);

            // Lưu lịch sử hóa đơn
            HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                    .note(billConfirmRequest.getNoteBillHistory())
                    .idStaff(billConfirmRequest.getIdStaff())
                    .bill(bill)
                    .build();
            hdBillHistoryService.save(hdBillHistoryRequest);

            return bill;
        } else {
            return null;
        }
    }

    @Override
    public HDBillResponse getOne(String id) {
        return hdBillRepository.getBillResponse(id);
    }

    @Transactional
    @Override
    public Bill updateStatusBill(String idBill, HDBillRequest hdBillRequest) {
        Bill bill = hdBillRepository.findById(idBill).get();
        bill.setStatus(hdBillRequest.getStatus());
        if (hdBillRequest.getStatus() == 3) {
            bill.setShipDate(DateUtil.getCurrentTimeNow());
        } else if (hdBillRequest.getStatus() == 7) {
            bill.setCompleteDate(DateUtil.getCurrentTimeNow());
        } else if (hdBillRequest.getStatus() == 4) {
            bill.setReceiveDate(DateUtil.getCurrentTimeNow());
        } else {
            hdBillRepository.save(bill);
        }
        HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                .note(hdBillRequest.getNoteBillHistory())
                .idStaff(hdBillRequest.getIdStaff())
                .bill(bill)
                .build();
        hdBillHistoryService.save(hdBillHistoryRequest);
        return hdBillRepository.save(bill);
    }

    @Transactional
    @Override
    public Bill confirmPayment(String idBill, HDConfirmPaymentRequest hdConfirmPaymentRequest) {
        Bill bill = hdBillRepository.findById(idBill).get();
        Transaction transaction = new Transaction();
        transaction.setPaymentMethod(hdConfirmPaymentRequest.getPaymentMethod());
        transaction.setType(hdConfirmPaymentRequest.getType());
        transaction.setBill(bill);
        transaction.setStatus(hdConfirmPaymentRequest.getStatus());
        transaction.setNote(hdConfirmPaymentRequest.getNoteBillHistory());
        transaction.setTotalMoney(hdConfirmPaymentRequest.getPaymentAmount());
        transaction.setAccount(null);
        transaction.setTransactionCode(hdConfirmPaymentRequest.getTransactionCode());
        transactionRepository.save(transaction);
        bill.setStatus(5);
        hdBillRepository.save(bill);
        HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                .note(hdConfirmPaymentRequest.getNoteBillHistory())
                .idStaff(hdConfirmPaymentRequest.getIdStaff())
                .bill(bill)
                .build();
        hdBillHistoryService.save(hdBillHistoryRequest);
        bill.setStatus(5);
        return bill;
    }

    @Transactional
    @Override
    public Bill
    updateBillDetailByBill(String idBill, List<HDBillDetailRequest> listHDBillRequest) {
        Bill bill = hdBillRepository.findById(idBill).orElse(null);
// Xóa tất cả chi tiết hóa đơn đã có:
        hdBillDetailRepository.deleteByBillId(idBill);
        if (bill != null && (bill.getStatus() < 3 || bill.getStatus() == 6)) {
            // Xử lý danh sách chi tiết hóa đơn mới
            List<BillDetail> newBillDetails = listHDBillRequest.stream()
                    .map((hdBillDetailRequest) -> {
                        BigDecimal price = hdBillDetailRequest.getPrice();
                        int quantity = hdBillDetailRequest.getQuantity();
                        BillDetail billDetail = new BillDetail();
                        billDetail.setBill(bill);
                        billDetail.setProductDetail(productDetailRepository.findById(hdBillDetailRequest
                                .getProductDetailId()).orElse(null));
                        billDetail.setPrice(price);
                        billDetail.setQuantity(quantity);
                        billDetail.setStatus(hdBillDetailRequest.getStatus());
                        return billDetail;
                    }).collect(Collectors.toList());

            BigDecimal totalMoney = BigDecimal.ZERO;
            for (BillDetail detail : newBillDetails) {
                totalMoney = totalMoney.add(detail.getPrice().multiply(BigDecimal.valueOf(detail.getQuantity())));
            }
            // Lưu danh sách chi tiết hóa đơn mới vào cơ sở dữ liệu
            hdBillDetailRepository.saveAll(newBillDetails);

            // Cập nhật thông tổng tiền cảu hoá đơn
            bill.setTotalMoney(totalMoney);
            BigDecimal moneyAfter = totalMoney.subtract(bill.getMoneyReduced()).add(bill.getMoneyShip());
            bill.setMoneyAfter(moneyAfter);

            return hdBillRepository.save(bill);
        } else {
            return null;
        }
    }


    // Phương thức để tạo mã hóa đơn duy nhất
    private String generateUniqueBillCode() {
        String baseCode = "HD";
        int counter = 1;
        String uniqueCode = baseCode + counter;

        // Kiểm tra sự trùng lặp và tăng biến đếm cho đến khi tạo được mã duy nhất
        while (hdBillRepository.existsByCode(uniqueCode)) {
            counter++;
            uniqueCode = baseCode + counter;
        }

        return uniqueCode;

    }

}
