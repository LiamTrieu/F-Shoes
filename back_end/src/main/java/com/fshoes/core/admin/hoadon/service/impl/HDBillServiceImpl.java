package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.BillConfirmRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
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
import com.fshoes.infrastructure.constant.StatusBillDetail;
import com.fshoes.infrastructure.constant.TypeBill;
import com.fshoes.repository.CustomerRepository;
import com.fshoes.repository.ProductDetailRepository;
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
import java.util.Calendar;
import java.util.List;

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
    private HDBillDetailService hdBillDetailService;

    @Autowired
    private ProductDetailRepository productDetailRepository;


    @Autowired
    private HDBillHistoryService hdBillHistoryService;

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
        Long start = DateUtil.parseDateTimeLong(startDate);
        Long end = DateUtil.parseDateTimeLong(endDate);
        Pageable pageable = PageRequest.of(pageNo, 1000);
        return hdBillRepositpory.getBillByDateRange(pageable, start, end);
    }

    @Override
    public Page<HDBillResponse> getBillByTotalMoneyRange(Integer pageNo, BigDecimal minPrice, BigDecimal maxPrice) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hdBillRepositpory.getBillByTotalMoneyRange(pageable, minPrice, maxPrice);
    }

    @Override
    public Page<HDBillResponse> filterBill(Integer pageNo, String statusRequest, String startDate, String endDate, String typeRequest) {
        Boolean type;
        Integer status;
        try {
            status = Integer.valueOf(statusRequest);
        } catch (Exception exception) {
            status = null;
        }
        if (!typeRequest.equalsIgnoreCase("true") && !typeRequest.equalsIgnoreCase("false")) {
            type = null;
        } else {
            type = Boolean.valueOf(typeRequest);
        }
        Long start;
        Long end;
        try {
            start = DateUtil.parseDateLong(startDate);
            end = DateUtil.parseDateLong(endDate);

        } catch (Exception exception) {
            start = null;
            end = null;
        }
        Pageable pageable = PageRequest.of(pageNo, 1000);
        return hdBillRepositpory.filterBill(pageable, status, start, end, type);
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
        BillHistory billHistory = BillHistory.builder()
                .bill(bill)
                .statusBill(bill.getStatus())
                .build();
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
            bill.setStatus(StatusBill.values()[hdBillRequest.getStatus()]);
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
                    .staff(staffRepository.findById(hdBillHistoryRequest.getIdStaff()).orElse(null))
                    .build());
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
                        bill.setStatus(StatusBill.DA_HUY);
                        HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                                .note(hdBillRequest.getNoteBillHistory())
                                .idStaff(hdBillRequest.getIdStaff())
                                .bill(bill)
                                .build();
                        hdBillHistoryRepository.save(BillHistory.builder()
                                .bill(hdBillHistoryRequest.getBill())
                                .note(hdBillHistoryRequest.getNote())
                                .statusBill(hdBillHistoryRequest.getBill().getStatus())
                                .staff(staffRepository.findById(hdBillHistoryRequest.getIdStaff()).orElse(null))
                                .build());
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

    @Override
    public Bill getOne(String id) {
        return hdBillRepositpory.findById(id).orElse(null);
    }

    @Override
    public Page<HDBillResponse> getBillByStatusAndType(Integer pageNo, String statusRequest, String typeRequest) {
        Pageable pageable = PageRequest.of(pageNo, 1000);
        Integer status;
        Boolean type;
        try {
            status = Integer.valueOf(statusRequest);
        } catch (Exception exception) {
            status = null;
        }
        if (!typeRequest.equalsIgnoreCase("true") && !typeRequest.equalsIgnoreCase("false")) {
            type = null;
        } else {
            type = Boolean.valueOf(typeRequest);
        }
        System.out.println(type);
        System.out.println(status);
        return hdBillRepositpory.getBillByStatusAndType(pageable, status, type);
    }

    @Transactional
    @Override
    public Bill confirmOrder(String idBill, BillConfirmRequest billConfirmRequest) {
        BigDecimal totalMoney = new BigDecimal(0);
        Bill bill = hdBillRepositpory.findById(idBill).orElse(null);
        List<HDBillDetailRequest> listHdct = billConfirmRequest.getListHdctReq();
        assert bill != null;
        if (bill.getStatus() == StatusBill.CHO_XAC_NHAN) {
            try {
                //kiem tra list hdct: thêm mới hdct hoặc cập nhật
                for (HDBillDetailRequest hdBillDetailRequest : listHdct
                ) {
                    BillDetail billDetail = hdBillDetailRepository.getBillDetailByBillIdAndProductDetailId(hdBillDetailRequest.getIdBill(), hdBillDetailRequest.getIdProductDetail());
                    if (billDetail != null) {
                        billDetail.setQuantity(hdBillDetailRequest.getQuanity());
                        billDetail.setPrice(hdBillDetailRequest.getPrice());
                        billDetail.setStatus(StatusBillDetail.values()[hdBillDetailRequest.getStatus()]);
                        hdBillDetailRepository.save(billDetail);
                    } else {
                        BillDetail detailNew = BillDetail.builder()
                                .bill(bill)
                                .productDetail(productDetailRepository.findById(hdBillDetailRequest.getIdProductDetail()).orElse(null))
                                .price(hdBillDetailRequest.getPrice())
                                .quantity(hdBillDetailRequest.getQuanity())
                                .status(StatusBillDetail.values()[hdBillDetailRequest.getStatus()])
                                .build();
                        hdBillDetailRepository.save(detailNew);
                    }
                    //xem lại - get db
                    totalMoney = hdBillDetailRequest.getPrice().multiply(BigDecimal.valueOf(hdBillDetailRequest.getQuanity()));
                }
                //update thoong tin & status hoa don:
                //const status = 2 => đã xác nhận
                bill.setStatus(StatusBill.DA_XAC_NHAN);
                if (billConfirmRequest.getIdVoucher() != null) {
                    Voucher voucher = voucherRepository.findById(billConfirmRequest.getIdVoucher()).orElse(null);
                    bill.setVoucher(voucher);
                } else {
                    bill.setVoucher(null);
                }
                if (billConfirmRequest.getIdCustomer() != null) {
                    Customer customer = customerRepository.findById(billConfirmRequest.getIdCustomer()).get();
                    bill.setCustomer(customer);
                } else {
                    bill.setCustomer(null);
                }
                bill.setFullName(billConfirmRequest.getFullName());
                bill.setNote(billConfirmRequest.getNote());
                bill.setAddress(billConfirmRequest.getAddress());
                bill.setPhoneNumber(billConfirmRequest.getPhoneNumber());
                bill.setConfirmationDate(Calendar.getInstance().getTimeInMillis());
                bill.setTotalMoney(totalMoney);
                hdBillRepositpory.save(bill);
            } catch (Exception exception) {
                exception.printStackTrace();
                return null;
            }
            HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                    .note(billConfirmRequest.getNoteBillHistory())
                    .idStaff(billConfirmRequest.getIdStaff())
                    .bill(bill)
                    .build();
            hdBillHistoryService.save(hdBillHistoryRequest);
        }
        return bill;
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
