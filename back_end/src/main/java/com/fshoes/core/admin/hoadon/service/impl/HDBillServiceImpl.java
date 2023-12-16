package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.*;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.core.admin.hoadon.model.respone.HDNhanVienResponse;
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
import com.fshoes.infrastructure.constant.Message;
import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.infrastructure.constant.TypeBill;
import com.fshoes.infrastructure.exception.RestApiException;
import com.fshoes.repository.AccountRepository;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.TransactionRepository;
import com.fshoes.util.DateUtil;
import com.fshoes.util.GenHoaDon;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;
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
    private GenHoaDon genHoaDon;

    @Autowired
    private AccountRepository accountRepository;


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

        if (userLogin.getUserLogin().getRole() == 1) {
            return hdBillRepository.filterBill(pageable, status, startDate, endDate, type, billFilterRequest.getInputSearch());
        } else {
            return hdBillRepository.filterBillByStaff(pageable, status, startDate, endDate, type, billFilterRequest.getInputSearch(), userLogin.getUserLogin().getId(), userLogin.getUserLogin().getEmail());
        }
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
            Bill billSave = clientBillRepository.save(bill);
            messagingTemplate.convertAndSend("/topic/real-time-thong-tin-don-hang-by-admin-update",
                    clientBillDetailRepository.getBillDetailsByBillId(bill.getId()));
            return billSave;
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
                                hdBillHistoryRepository.getListBillHistoryByIdBill(billHistory1.getBill().getId()));
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
            bill.setStatus(2);
            hdBillRepository.save(bill);
            // Lưu lịch sử hóa đơn
            HDBillHistoryRequest hdBillHistoryRequest = HDBillHistoryRequest.builder().note(billConfirmRequest.getNoteBillHistory()).idStaff(userLogin.getUserLogin().getId()).bill(bill).build();
            BillHistory billHistory = hdBillHistoryService.save(hdBillHistoryRequest);

            //trừ số lượng sp
            List<BillDetail> billDetails = hdBillDetailRepository.getBillDetailByBillId(idBill);
            billDetails.forEach(billDetail -> {
                ProductDetail productDetail = billDetail.getProductDetail();
                productDetail.setAmount(productDetail.getAmount() - billDetail.getQuantity());
                productDetailRepository.save(productDetail);
                messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-by-admin-corfim-bill",
                        clientProductDetailRepository.updateRealTime(productDetail.getId()));
            });

            messagingTemplate.convertAndSend("/topic/real-time-xac-nhan-bill-page-admin",
                    hdBillRepository.realTimeBill(bill.getId()));
            messagingTemplate.convertAndSend("/topic/real-time-xac-nhan-bill-my-profile",
                    clientBillRepository.realTimeBillMyProfile(bill.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-bill-detail-client-by-bill-comfirm",
                    clientBillDetailRepository.realTimeBillDetailByStatus(bill.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-bill-history-client-by-bill-comfirm",
                    hdBillHistoryRepository.getListBillHistoryByIdBill(billHistory.getBill().getId()));
        }
        return bill;
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
                hdBillHistoryRepository.getListBillHistoryByIdBill(billHistory.getBill().getId()));
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
                    hdBillHistoryRepository.getListBillHistoryByIdBill(billHistory.getBill().getId()));
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

    @Override
    public File xuatHoaDon(String idBill) {
        Bill bill = hdBillRepository.findById(idBill).get();
        BillHistory billHistory = hdBillHistoryRepository.findDistinctFirstByBillOrderByCreatedAtDesc(bill).orElseThrow(
                () -> new RestApiException(Message.API_ERROR));
        Account account = accountRepository.findByEmail(billHistory.getCreatedBy()).orElseThrow(
                () -> new RestApiException(Message.API_ERROR));
        List<BillDetail> lstBillDetail = hdBillDetailRepository.getBillDetailByBillId(idBill);
        return genHoaDon.genHoaDon(bill, lstBillDetail, billHistory, account);
    }

    @Override
    public Boolean returnSttBill(String idBill, HDBillRequest hdBillRequest) {
        List<BillHistory> billHistorys = hdBillHistoryRepository.getBillHistoryNew(idBill);
        if (billHistorys.size() > 1) {
            BillHistory billHistory1 = billHistorys.get(0); // history hiện tại
            BillHistory billHistory2 = billHistorys.get(1); // history chứa sttBill sẽ quay lại
            String note = userLogin.getUserLogin().getCode() + " đã chuyển trạng thái hoá đơn từ " + getTitleStatusBill(billHistory1.getStatusBill()) + " -> " + getTitleStatusBill(billHistory2.getStatusBill()) + "\n Lý do: ";
            //set stt bill = trạng thái bill trước (billHistory2.getStatusBill())
            Bill bill = billHistory1.getBill();
            Integer sttBill = bill.getStatus();
            bill.setStatus(billHistory2.getStatusBill());
            hdBillRepository.save(bill);
            if (billHistory1.getStatusBill() == 5) {
                Integer resultDeleteTrans = transactionRepository.deleteTransactionByIdBill(idBill);
            }
            //set billHistory gần nhất là null để ẩn khoit timeline
            billHistory1.setStatusBill(10);
            hdBillHistoryRepository.save(billHistory1);
            //thêm mới billHistory return stt bill
            BillHistory billHistoryNew = new BillHistory();

            billHistoryNew.setNote(note + "'" + hdBillRequest.getNoteBillHistory() + "'");
            billHistoryNew.setBill(bill);
            billHistoryNew.setAccount(userLogin.getUserLogin());
            hdBillHistoryRepository.save(billHistoryNew);
            // lấy list billDetail
            List<BillDetail> billDetails = hdBillDetailRepository.getBillDetailByBillId(idBill);
            //nếu quay lại trạng thái chờ xác nhận: rollback số lượng sp
            if (bill.getStatus() == 1 && sttBill != 0) {
                billDetails.forEach(billDetail -> {
                    ProductDetail productDetail = billDetail.getProductDetail();
                    productDetail.setAmount(productDetail.getAmount() + billDetail.getQuantity());
                    productDetailRepository.save(productDetail);
                    messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-by-roll-back-bill-status-comfirm",
                            clientProductDetailRepository.updateRealTime(productDetail.getId()));
                });
            }
            //nếu return từ trạng thái huỷ đơn về trạng thái trước: (!= chờ xác nhận): trừ số lượng sp
            if (sttBill == 0 && billHistory2.getStatusBill() != 1) {
                billDetails.forEach(billDetail -> {
                    ProductDetail productDetail = billDetail.getProductDetail();
                    productDetail.setAmount(productDetail.getAmount() - billDetail.getQuantity());
                    productDetailRepository.save(productDetail);
                    messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-by-roll-back-bill-status-cancel",
                            clientProductDetailRepository.updateRealTime(productDetail.getId()));
                });
            }

            return true;
        } else {
            return false;
        }

    }

    @Override
    public HDBillResponse isCheckBillExist(String idBill) {
        return hdBillRepository.getBillExist(idBill, userLogin.getUserLogin().getId(), userLogin.getUserLogin().getEmail());
    }

    @Override
    public Page<HDNhanVienResponse> getListNhanVien(String idBill, HDNhanVienSearchRequest hdNhanVienSearchRequest) {
        Pageable pageable = PageRequest.of(hdNhanVienSearchRequest.getPage() - 1, hdNhanVienSearchRequest.getSize());
        return hdBillRepository.getListNhanVien(idBill, hdNhanVienSearchRequest, pageable);
    }

    @Override
    public Boolean themNhanVienTiepNhan(String idBill, String idAccount) {
        try {
            Bill bill = hdBillRepository.findById(idBill).get();
            Account account = accountRepository.findById(idAccount).get();
            BillHistory billHistory = new BillHistory();
            billHistory.setNote("Thêm " + account.getCode() + "-" + account.getFullName() + " tiếp nhận đơn hàng");
            billHistory.setAccount(userLogin.getUserLogin());
            billHistory.setReceptionStaff(account);
            billHistory.setBill(bill);
            hdBillHistoryRepository.save(billHistory);
            return true;
        } catch (Exception exception) {
            exception.printStackTrace();
            return false;
        }
    }

    @Override
    public File xuatHoaDonGiaoHang(String idBill) {
        Bill bill = hdBillRepository.findById(idBill).get();
        BillHistory billHistory = hdBillHistoryRepository.findDistinctFirstByBillOrderByCreatedAtDesc(bill).orElseThrow(
                () -> new RestApiException(Message.API_ERROR));
        Account account = accountRepository.findByEmail(billHistory.getCreatedBy()).orElseThrow(
                () -> new RestApiException(Message.API_ERROR));
        List<BillDetail> lstBillDetail = hdBillDetailRepository.getBillDetailByBillId(idBill);
        return genHoaDon.genHoaDonGiaoHang(bill, lstBillDetail, billHistory, account);
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

    private String getTitleStatusBill(Integer status) {
        switch (status) {
            case 0:
                return "Đã hủy";
            case 1:
                return "Chờ xác nhận";
            case 2:
                return "Chờ giao hàng";
            case 3:
                return "Đang vận chuyển";
            case 4:
                return "Đã giao hàng";
            case 5:
                return "Đã thanh toán";
            case 6:
                return "Chờ thanh toán";
            case 7:
                return "Hoàn thành";
            case 8:
                return "Tạo đơn hàng";
            case 9:
                return "Trả hàng";
            case 10:
                return "Không tồn tại";
            default:
                return "Không xác định";
        }
    }

}
