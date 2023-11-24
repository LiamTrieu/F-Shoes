package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.*;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepository;
import com.fshoes.core.admin.hoadon.service.HDBillHistoryService;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.core.admin.sanpham.repository.AdProductDetailRepository;
import com.fshoes.core.client.repository.ClientBillDetailRepository;
import com.fshoes.core.client.repository.ClientBillHistoryRepository;
import com.fshoes.core.client.repository.ClientBillRepository;
import com.fshoes.core.client.repository.ClientProductDetailRepository;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.*;
import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.infrastructure.constant.TypeBill;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.TransactionRepository;
import com.fshoes.util.DateUtil;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private HDBillHistoryRepository hdBillHistoryRepository;

    @Autowired
    private HDBillDetailRepository hdBillDetailRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    @Autowired
    private HDBillHistoryService hdBillHistoryService;

    @Autowired
    private UserLogin userLogin;


    @Autowired
    private ClientProductDetailRepository clientProductDetailRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ClientBillRepository clientBillRepository;

    @Autowired
    private ClientBillHistoryRepository clientBillHistoryRepository;

    @Autowired
    private AdProductDetailRepository adProductDetailRepository;

    @Autowired
    private ClientBillDetailRepository clientBillDetailRepository;

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
            bill.setFullName(hdBillRequest.getFullName());
            bill.setPhoneNumber(hdBillRequest.getPhoneNumber());
            bill.setAddress(hdBillRequest.getAddress());
            bill.setNote(hdBillRequest.getNote());
            bill.setMoneyShip(hdBillRequest.getMoneyShip());
            if (bill.getMoneyReduced() != null) {
                bill.setMoneyAfter((bill.getTotalMoney().add(hdBillRequest.getMoneyShip())).subtract(bill.getMoneyReduced()));
            } else {
                bill.setMoneyAfter(bill.getTotalMoney().add(hdBillRequest.getMoneyShip()));
            }
            //thêm history:
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill);
            billHistory.setNote(hdBillRequest.getNoteBillHistory());
            billHistory.setAccount(userLogin.getUserLogin());
            hdBillHistoryRepository.save(billHistory);
            return hdBillRepository.save(bill);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    @Override
    public Boolean cancelOrder(String idBill, HDBillRequest hdBillRequest) {
        Bill bill = hdBillRepository.findById(idBill).orElse(null);
        if (hdBillRepository.existsById(idBill)) {
            try {
                if (!hdBillRequest.getNoteBillHistory().trim().isEmpty()) {
                    if (bill != null) {
                        if (bill.getStatus() != 1) {
                            List<HDBillDetailResponse> hdBillDetailResponses = hdBillDetailRepository.getBillDetailsByBillId(idBill);

                            hdBillDetailResponses.forEach(hdBillDetailResponse -> {
                                ProductDetail productDetail = productDetailRepository.findById(hdBillDetailResponse.getProductDetailId()).get();
                                int newAmount = productDetail.getAmount() + hdBillDetailResponse.getQuantity();
                                productDetail.setAmount(newAmount);
                                productDetailRepository.save(productDetail);
                                messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-cancel-bill",
                                        clientProductDetailRepository.updateRealTime(productDetail.getId()));
                                messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-cancel-bill-admin",
                                        adProductDetailRepository.realTimeProductDetailAdmin(productDetail.getId()));
                            });
                        }

                        bill.setStatus(0);

                        BillHistory billHistory = new BillHistory();
                        billHistory.setBill(bill);
                        billHistory.setStatusBill(0);
                        billHistory.setNote(hdBillRequest.getNoteBillHistory());
                        billHistory.setAccount(userLogin.getUserLogin());
                        BillHistory billHistory1 = hdBillHistoryRepository.save(billHistory);
                        messagingTemplate.convertAndSend("/topic/real-time-huy-don-bill-page-admin",
                                hdBillRepository.realTimeBill(bill.getId()));
                        messagingTemplate.convertAndSend("/topic/real-time-huy-don-bill-my-profile",
                                clientBillRepository.realTimeBillMyProfile(bill.getId()));
                        hdBillRepository.save(bill);
                        messagingTemplate.convertAndSend("/topic/realtime-bill-history-client-by-bill-huy-don",
                                clientBillHistoryRepository.getListBillHistoryByIdBill(billHistory1.getBill().getId()));
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
                            messagingTemplate.convertAndSend("/topic/realtime-san-pham-client",
                                    clientProductDetailRepository.updateRealTime(productDetail.getId()));
                            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-by-status-bill-2",
                                    clientProductDetailRepository.updateRealTime(productDetail.getId()));
                            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-admin-by-bill-comfirm",
                                    adProductDetailRepository.realTimeProductDetailAdmin(productDetail.getId()));
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

            if (bill.getMoneyReduced() != null) {
                BigDecimal moneyAfter = totalMoney.subtract(bill.getMoneyReduced()).add(bill.getMoneyShip());
                bill.setMoneyAfter(moneyAfter);
            }

            // Lưu danh sách chi tiết hóa đơn mới vào cơ sở dữ liệu
            hdBillDetailRepository.saveAll(newBillDetails);

            // Cập nhật thông tin hóa đơn và trạng thái
            bill.setStatus(2);
            bill.setFullName(billConfirmRequest.getFullName());
            bill.setNote(billConfirmRequest.getNote());
            bill.setAddress(billConfirmRequest.getAddress());
            bill.setPhoneNumber(billConfirmRequest.getPhoneNumber());
            bill.setConfirmationDate(Calendar.getInstance().getTimeInMillis());
            bill.setTotalMoney(totalMoney);
            bill.setConfirmationDate(DateUtil.getCurrentTimeNow());
            hdBillRepository.save(bill);
            messagingTemplate.convertAndSend("/topic/real-time-xac-nhan-bill-page-admin",
                    hdBillRepository.realTimeBill(bill.getId()));
            messagingTemplate.convertAndSend("/topic/real-time-xac-nhan-bill-my-profile",
                    clientBillRepository.realTimeBillMyProfile(bill.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-bill-detail-client-by-bill-comfirm",
                    clientBillDetailRepository.realTimeBillDetailByStatus(bill.getId()));

            // Lưu lịch sử hóa đơn
            HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                    .note(billConfirmRequest.getNoteBillHistory())
                    .idStaff(userLogin.getUserLogin().getId())
                    .bill(bill)
                    .build();
            BillHistory billHistory = hdBillHistoryService.save(hdBillHistoryRequest);
            messagingTemplate.convertAndSend("/topic/realtime-bill-history-client-by-bill-comfirm",
                    clientBillHistoryRepository.getListBillHistoryByIdBill(billHistory.getBill().getId()));

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
                .idStaff(userLogin.getUserLogin().getId())
                .bill(bill)
                .build();
        BillHistory billHistory = hdBillHistoryService.save(hdBillHistoryRequest);
        messagingTemplate.convertAndSend("/topic/real-time-update-status-bill-page-admin",
                hdBillRepository.realTimeBill(bill.getId()));
        messagingTemplate.convertAndSend("/topic/real-time-update-status-bill-my-profile",
                clientBillRepository.realTimeBillMyProfile(bill.getId()));
        messagingTemplate.convertAndSend("/topic/realtime-bill-detail-client-by-bill-update-status",
                clientBillDetailRepository.realTimeBillDetailByStatus(bill.getId()));
        messagingTemplate.convertAndSend("/topic/realtime-bill-history-client-by-bill-update-status",
                clientBillHistoryRepository.getListBillHistoryByIdBill(billHistory.getBill().getId()));
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
        transaction.setTotalMoney(bill.getMoneyAfter());
        transaction.setAccount(userLogin.getUserLogin());
        transaction.setTransactionCode(hdConfirmPaymentRequest.getTransactionCode());
        transactionRepository.save(transaction);
        if (hdConfirmPaymentRequest.getType() == 0) {
            bill.setCustomerAmount(hdConfirmPaymentRequest.getPaymentAmount());
            bill.setStatus(5);
            hdBillRepository.save(bill);
            HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder()
                    .note(hdConfirmPaymentRequest.getNoteBillHistory())
                    .idStaff(userLogin.getUserLogin().getId())
                    .bill(bill)
                    .build();
            BillHistory billHistory = hdBillHistoryService.save(hdBillHistoryRequest);
            messagingTemplate.convertAndSend("/topic/real-time-payment-bill-page-admin",
                    hdBillRepository.realTimeBill(bill.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-bill-detail-client-by-bill-confirm-payment",
                    clientBillDetailRepository.realTimeBillDetailByStatus(bill.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-bill-history-client-by-bill-confirm-payment",
                    clientBillHistoryRepository.getListBillHistoryByIdBill(billHistory.getBill().getId()));
            return bill;
        } else {
            BillHistory hdBillHistory = BillHistory.builder()
                    .note(hdConfirmPaymentRequest.getNoteBillHistory())
                    .statusBill(null)
                    .bill(bill)
                    .account(userLogin.getUserLogin())
                    .build();
            BillHistory billHistory = hdBillHistoryRepository.save(hdBillHistory);
            messagingTemplate.convertAndSend("/topic/real-time-payment-bill-page-admin",
                    hdBillRepository.realTimeBill(bill.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-bill-detail-client-by-bill-confirm-payment",
                    clientBillDetailRepository.realTimeBillDetailByStatus(bill.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-bill-history-client-by-bill-confirm-payment",
                    clientBillHistoryRepository.getListBillHistoryByIdBill(billHistory.getBill().getId()));
            return bill;
        }
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
