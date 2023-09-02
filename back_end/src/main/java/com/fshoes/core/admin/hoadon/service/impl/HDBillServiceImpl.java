package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.HDBillHistoryRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepositpory;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.Customer;
import com.fshoes.entity.Voucher;
import com.fshoes.repository.CustomerRepository;
import com.fshoes.repository.StaffRepository;
import com.fshoes.repository.VoucherRepository;
import com.fshoes.util.DateUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;

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
    private StaffRepository staffRepository;

    @Override
    public Page<HDBillResponse> getAllBill(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hdBillRepositpory.getAllBill(pageable);
    }

    @Override
    public Page<HDBillResponse> getAllBillOrderByTotalMoney(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hdBillRepositpory.getAllBillOrderByTotalMoney(pageable);
    }

    @Override
    public Page<HDBillResponse> searchBillByInputText(Integer pageNo, String inputSearch) {
        Pageable pageable = PageRequest.of(pageNo, 1000);
        return hdBillRepositpory.searchBillByInputText(pageable, inputSearch);
    }

    @Override
    public Page<HDBillResponse> getBillByType(Integer pageNo, String type) {
        if (type.equals("true") || type.equals("false")) {
            Pageable pageable = PageRequest.of(pageNo, 5);
            return hdBillRepositpory.getBillByType(pageable, Boolean.valueOf(type));
        } else {
            return Page.empty();
        }
    }

    @Override
    public Page<HDBillResponse> getBillByStatus(Integer pageNo, Integer status) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hdBillRepositpory.getBillByStatus(pageable, status);
    }

    @Override
    public Page<HDBillResponse> getBillByDateRange(Integer pageNo, String startDate, String endDate) throws ParseException {
        Long start = DateUtil.parseDateLong(startDate);
        Long end = DateUtil.parseDateLong(endDate);
        Pageable pageable = PageRequest.of(pageNo, 1000);
        return hdBillRepositpory.getBillByDateRange(pageable, start, end);
    }

    @Override
    public Page<HDBillResponse> getBillByTotalMoneyRange(Integer pageNo, BigDecimal minPrice, BigDecimal maxPrice) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hdBillRepositpory.getBillByTotalMoneyRange(pageable, minPrice, maxPrice);
    }

    @Override
    public Page<HDBillResponse> getBillByStatusAndDateRange(Integer pageNo, Integer status, String startDate, String endDate) throws ParseException {
        try {
            Long start = DateUtil.parseDateLong(startDate);
            Long end = DateUtil.parseDateLong(endDate);
            Pageable pageable = PageRequest.of(pageNo, 5);
            return hdBillRepositpory.getBillByStatusAndDateRange(pageable, status, start, end);
        } catch (Exception exception) {
            return null;
        }
    }

    //staff create bill - type = 0: tại quầy, 1: qua web
    @Override
    public Bill createBill() {
        Bill billCreat = Bill.builder()
                .code(generateUniqueBillCode())
                .status(1)
                .type(false)
                .build();
        Bill bill = hdBillRepositpory.save(billCreat);

        //thêm bill history khi tạo hoá đơn - trạng thái: chờ xác nhận
        BillHistory billHistory = BillHistory.builder()
                .bill(bill)
                .statusBill(bill.getStatus())
                .build();
        hdBillHistoryRepository.save(billHistory);

        return bill;

    }

    @Transactional
    @Override
    public Bill updateBill(Integer idBill, HDBillRequest hdBillRequest) {
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
                Customer customer = customerRepository.findById(hdBillRequest.getIdCustomer()).get();
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
            hdBillHistoryRepository.save(BillHistory.builder()
                    .bill(hdBillHistoryRequest.getBill())
                    .note(hdBillHistoryRequest.getNote())
                    .statusBill(hdBillHistoryRequest.getBill().getStatus())
                    .staff(staffRepository.findById(hdBillHistoryRequest.getIdStaff()).get())
                    .build());
            return hdBillRepositpory.save(bill);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    @Override
    public Bill cancelOrder(Integer idBill, HDBillRequest hdBillRequest) {
        Bill bill = hdBillRepositpory.findById(idBill).orElse(null);
        if (hdBillRepositpory.existsById(idBill)) {
            try {
                if (hdBillRequest.getNoteBillHistory().trim() != null) {
                    bill.setStatus(0);
                    HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                            .note(hdBillRequest.getNoteBillHistory())
                            .idStaff(hdBillRequest.getIdStaff())
                            .bill(bill)
                            .build();
                    hdBillHistoryRepository.save(BillHistory.builder()
                            .bill(hdBillHistoryRequest.getBill())
                            .note(hdBillHistoryRequest.getNote())
                            .statusBill(hdBillHistoryRequest.getBill().getStatus())
                            .staff(staffRepository.findById(hdBillHistoryRequest.getIdStaff()).get())
                            .build());
                    hdBillRepositpory.save(bill);
                }
            } catch (Exception exception) {
                return null;
            }
            return bill;
        } else {
            return null;
        }

    }

    @Override
    public Bill getOne(Integer id) {
        return hdBillRepositpory.findById(id).orElse(null);
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
