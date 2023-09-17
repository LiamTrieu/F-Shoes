package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.BillConfirmRequest;
import com.fshoes.core.admin.hoadon.model.request.BillFilterRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillHistoryRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepositpory;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.core.admin.hoadon.service.HDBillHistoryService;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.Customer;
import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.infrastructure.constant.TypeBill;
import com.fshoes.repository.CustomerRepository;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.StaffRepository;
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
import java.util.stream.Collectors;

@Service
public class HDBillServiceImpl implements HDBillService {
    @Autowired
    private HDBillRepositpory hdBillRepositpory;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private HDBillHistoryRepository hdBillHistoryRepository;

    @Autowired
    private HDBillDetailRepository hdBillDetailRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;


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

        return hdBillRepositpory.filterBill(pageable, status, startDate, endDate, type, billFilterRequest.getInputSearch());
    }

    //staff create bill - type = 0: tại quầy, 1: qua web
    @Override
    public Bill createBill() {
        Bill billCreat = Bill.builder()
                .code(generateUniqueBillCode())
                .status(StatusBill.CHO_XAC_NHAN)
                .type(TypeBill.TAI_QUAY)
                .build();
        Bill bill = hdBillRepositpory.save(billCreat);

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
            Bill bill = hdBillRepositpory.findById(idBill).orElseThrow(() -> new RuntimeException("khong tim thay bill co id: " + idBill));
            if (hdBillRequest.getIdVoucher() == null || !voucherRepository.existsById(hdBillRequest.getIdVoucher())) {
                bill.setVoucher(null);
            } else {
                Voucher voucher = voucherRepository.findById(hdBillRequest.getIdVoucher()).orElse(null);
                bill.setVoucher(voucher);
            }
            if (hdBillRequest.getIdCustomer() == null) {
                bill.setCustomer(null);
            } else {
                Customer customer = customerRepository.findById(hdBillRequest.getIdCustomer()).orElse(null);
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
            billHistory.setStaff(staffRepository.findById(hdBillHistoryRequest.getIdStaff()).orElse(null));
            hdBillHistoryRepository.save(billHistory);
            return hdBillRepositpory.save(bill);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    @Override
    public Bill cancelOrder(String idBill, HDBillRequest hdBillRequest) {
        Bill bill = hdBillRepositpory.findById(idBill).orElse(null);
        if (hdBillRepositpory.existsById(idBill)) {
            try {
                if (hdBillRequest.getNoteBillHistory().trim().isEmpty()) {
                    if (bill != null) {
                        bill.setStatus(0);
                        HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                                .note(hdBillRequest.getNoteBillHistory())
                                .idStaff(hdBillRequest.getIdStaff())
                                .bill(bill)
                                .build();
                        BillHistory billHistory = new BillHistory();
                        billHistory.setBill(bill);
                        billHistory.setNote(hdBillHistoryRequest.getNote());
                        billHistory.setStaff(staffRepository.findById(hdBillHistoryRequest.getIdStaff()).orElse(null));
                        hdBillHistoryRepository.save(billHistory);
                        hdBillRepositpory.save(bill);
                    }
                }
            } catch (Exception exception) {
                return null;
            }
            return bill;
        } else {
            return null;
        }

    }

    @Transactional
    @Override
    public Bill confirmOrder(String idBill, BillConfirmRequest billConfirmRequest) {
        Bill bill = hdBillRepositpory.findById(idBill).orElse(null);

        if (bill != null && bill.getStatus() == 1) {

            // Xóa tất cả chi tiết hóa đơn đã có:
            hdBillDetailRepository.deleteByBillId(idBill);
            // Xử lý danh sách chi tiết hóa đơn mới
            List<BillDetail> newBillDetails = billConfirmRequest.getListHdctReq().stream()
                    .map((hdBillDetailRequest) -> {
                        BigDecimal price = hdBillDetailRequest.getPrice();
                        int quantity = hdBillDetailRequest.getQuanity();
                        BillDetail billDetail = new BillDetail();
                        billDetail.setBill(bill);
                        billDetail.setProductDetail(productDetailRepository.findById(hdBillDetailRequest
                                .getIdProductDetail()).orElse(null));
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

            // Cập nhật thông tin hóa đơn và trạng thái
            bill.setStatus(2);
            bill.setVoucher(billConfirmRequest.getIdVoucher() != null ? voucherRepository.findById(billConfirmRequest.getIdVoucher()).orElse(null) : null);
            bill.setCustomer(billConfirmRequest.getIdCustomer() != null ? customerRepository.findById(billConfirmRequest.getIdCustomer()).orElse(null) : null);
            bill.setFullName(billConfirmRequest.getFullName());
            bill.setNote(billConfirmRequest.getNote());
            bill.setAddress(billConfirmRequest.getAddress());
            bill.setPhoneNumber(billConfirmRequest.getPhoneNumber());
            bill.setConfirmationDate(Calendar.getInstance().getTimeInMillis());
            bill.setTotalMoney(totalMoney);
            System.out.println(bill);
            hdBillRepositpory.save(bill);

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
        return hdBillRepositpory.getBillResponse(id);
    }

    // Phương thức để tạo mã hóa đơn duy nhất
    private String generateUniqueBillCode() {
        String baseCode = "HD";
        int counter = 1;
        String uniqueCode = baseCode + counter;

        // Kiểm tra sự trùng lặp và tăng biến đếm cho đến khi tạo được mã duy nhất
        while (hdBillRepositpory.existsByCode(uniqueCode)) {
            counter++;
            uniqueCode = baseCode + counter;
        }

        return uniqueCode;

    }

}
