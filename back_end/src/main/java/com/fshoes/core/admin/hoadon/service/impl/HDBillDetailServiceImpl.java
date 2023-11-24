package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepository;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.core.admin.sanpham.repository.AdProductDetailRepository;
import com.fshoes.core.admin.sell.repository.AdminSellGetProductRepository;
import com.fshoes.core.client.repository.ClientProductDetailRepository;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.ProductDetail;
import com.fshoes.infrastructure.constant.StatusBillDetail;
import com.fshoes.repository.ProductDetailRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Service
public class HDBillDetailServiceImpl implements HDBillDetailService {

    @Autowired
    private HDBillDetailRepository hdBillDetailRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private HDBillRepository hdBillRepositpory;

    @Autowired
    private HDBillHistoryRepository hdBillHistoryRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ClientProductDetailRepository clientProductDetailRepository;

    @Autowired
    private AdProductDetailRepository adProductDetailRepository;

    @Autowired
    private AdminSellGetProductRepository adminSellGetProductRepository;

    @Autowired
    private UserLogin userLogin;

    @Transactional
    @Override
    public BillDetail save(HDBillDetailRequest hdBillDetailRequest) {

        Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
        ProductDetail productDetail = productDetailRepository.findById(hdBillDetailRequest.getProductDetailId()).get();

        BillDetail billDetail = hdBillDetailRepository.getBillDetailByBillIdAndProductDetailId(hdBillDetailRequest.getIdBill(), hdBillDetailRequest.getProductDetailId());
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill);
        billHistory.setAccount(userLogin.getUserLogin());

        if (billDetail == null) {

            BillDetail newBillDetail = BillDetail.builder()
                    .bill(bill)
                    .productDetail(productDetail)
                    .price(hdBillDetailRequest.getPrice())
                    .quantity(hdBillDetailRequest.getQuantity())
                    .status(StatusBillDetail.values()[hdBillDetailRequest.getStatus()])
                    .build();

            if (bill.getStatus() == 2 || bill.getStatus() == 6) {
                productDetail.setAmount(productDetail.getAmount() - hdBillDetailRequest.getQuantity());
                productDetailRepository.save(productDetail);
                messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-by-add-in-bill-detail",
                        clientProductDetailRepository.updateRealTime(productDetail.getId()));
                messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-admin-by-add-in-bill-detail",
                        adProductDetailRepository.realTimeProductDetailAdmin(productDetail.getId()));
//                messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-modal-add-admin-by-add-in-bill-detail",
//                        adminSellGetProductRepository.realTimeProductModalAddAdmin(productDetail.getId()));
            }

            List<HDBillDetailResponse> listBillDetail = hdBillDetailRepository.getBillDetailsByBillId(bill.getId());

            BigDecimal totalAmount = listBillDetail.stream()
                    .filter(item -> item.getStatus() == 0)
                    .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            bill.setTotalMoney(totalAmount);
            BigDecimal tienCanThanhToan = totalAmount;
            if (bill.getMoneyReduced() != null) {
                tienCanThanhToan = totalAmount.subtract(bill.getMoneyReduced());
            }
            if (bill.getMoneyShip() != null) {
                tienCanThanhToan = totalAmount.add(bill.getMoneyShip());
            }
            bill.setMoneyAfter(tienCanThanhToan);
            hdBillRepositpory.save(bill);

            billHistory.setNote("Đã thêm " + hdBillDetailRequest.getQuantity() + " sản phẩm" + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize());
            hdBillHistoryRepository.save(billHistory);
            return hdBillDetailRepository.save(newBillDetail);

        } else {

            if (bill.getStatus() == 2 || bill.getStatus() == 6) {
                int differenceQuantity = billDetail.getQuantity() - hdBillDetailRequest.getQuantity();
                productDetail.setAmount(productDetail.getAmount() + differenceQuantity);
                productDetailRepository.save(productDetail);
                if (differenceQuantity > 0) {
                    billHistory.setNote("Đã xoá " + differenceQuantity + " sản phẩm " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize());
                } else if (differenceQuantity < 0) {
                    billHistory.setNote("Đã thêm " + differenceQuantity + " sản phẩm " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize());
                }
            }

            billDetail.setQuantity(hdBillDetailRequest.getQuantity());
            billDetail.setStatus(hdBillDetailRequest.getStatus());
            billDetail.setPrice(hdBillDetailRequest.getPrice());

            hdBillHistoryRepository.save(billHistory);
            return hdBillDetailRepository.save(billDetail);

        }

    }

    @Override
    public List<HDBillDetailResponse> getBillDetailByBillId(String idBill) {
        return hdBillDetailRepository.getBillDetailsByBillId(idBill);
    }

    @Override
    public BillDetail updateBillDetail(String idBillDetail, HDBillDetailRequest hdBillDetailRequest) {

        BillDetail billDetail = hdBillDetailRepository.findById(idBillDetail).orElseThrow(() -> new RuntimeException("Khong tim thay bill detail"));

        Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
        ProductDetail productDetail = productDetailRepository.findById(hdBillDetailRequest.getProductDetailId()).get();

        billDetail.setBill(bill);
        billDetail.setProductDetail(productDetail);
        billDetail.setPrice(hdBillDetailRequest.getPrice());
        billDetail.setQuantity(hdBillDetailRequest.getQuantity());
        billDetail.setStatus(hdBillDetailRequest.getStatus());

        return hdBillDetailRepository.save(billDetail);

    }

    @Override
    public List<HDBillDetailResponse> getBillDetailByBillIdAndStatus(String idBill, Integer status) {
        return hdBillDetailRepository.getBillDetailsByBillIdAndStatus(idBill, status);
    }


    @Override
    public BillDetail getBillDetailByBillIdAndProductDetailId(String idBill, String idProductDetail) {
        return hdBillDetailRepository.getBillDetailByBillIdAndProductDetailId(idBill, idProductDetail);
    }

    @Override
    public BillDetail decrementQuantity(String idBillDetail) {
        BillDetail billDetail = hdBillDetailRepository.findById(idBillDetail).get();
        Bill bill = hdBillRepositpory.findById(billDetail.getBill().getId()).get();
        if (bill.getStatus() == 1) {
            billDetail.setQuantity(billDetail.getQuantity() - 1);
            hdBillDetailRepository.save(billDetail);
        } else {
            billDetail.setQuantity(billDetail.getQuantity() - 1);
            ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).get();
            productDetail.setAmount(productDetail.getAmount() + 1);
            productDetailRepository.save(productDetail);
            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-decrease-by-bill-detail",
                    clientProductDetailRepository.updateRealTime(productDetail.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-admin-decrease-by-bill-detail",
                    adProductDetailRepository.realTimeProductDetailAdmin(productDetail.getId()));
//            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-modal-add-admin-decrease-by-bill-detail",
//                    adminSellGetProductRepository.realTimeProductModalAddAdmin(productDetail.getId()));
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill);
            billHistory.setNote("Đã xoá 1 sản phẩm " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize());
            billHistory.setAccount(userLogin.getUserLogin());
            hdBillHistoryRepository.save(billHistory);
            hdBillDetailRepository.save(billDetail);
        }
        List<HDBillDetailResponse> listBillDetail = hdBillDetailRepository.getBillDetailsByBillId(bill.getId());

        BigDecimal totalAmount = listBillDetail.stream()
                .filter(item -> item.getStatus() == 0)
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        bill.setTotalMoney(totalAmount);
        BigDecimal tienCanThanhToan = totalAmount;
        if (bill.getMoneyReduced() != null) {
            tienCanThanhToan = totalAmount.subtract(bill.getMoneyReduced());
        }
        if (bill.getMoneyShip() != null) {
            tienCanThanhToan = totalAmount.add(bill.getMoneyShip());
        }
        bill.setMoneyAfter(tienCanThanhToan);
        hdBillRepositpory.save(bill);
        return billDetail;
    }

    @Override
    public BillDetail incrementQuantity(String idBillDetail) {
        BillDetail billDetail = hdBillDetailRepository.findById(idBillDetail).get();
        Bill bill = hdBillRepositpory.findById(billDetail.getBill().getId()).get();
        if (bill.getStatus() == 1) {
            billDetail.setQuantity(billDetail.getQuantity() + 1);
            hdBillDetailRepository.save(billDetail);
        } else {
            billDetail.setQuantity(billDetail.getQuantity() + 1);
            ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).get();
            productDetail.setAmount(productDetail.getAmount() - 1);
            productDetailRepository.save(productDetail);
            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-increase-by-bill-detail",
                    clientProductDetailRepository.updateRealTime(productDetail.getId()));
            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-admin-increase-by-bill-detail",
                    adProductDetailRepository.realTimeProductDetailAdmin(productDetail.getId()));
//            messagingTemplate.convertAndSend("/topic/realtime-san-pham-detail-modal-add-admin-increase-by-bill-detail",
//                    adminSellGetProductRepository.realTimeProductModalAddAdmin(productDetail.getId()));
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill);
            billHistory.setNote("Đã thêm 1 sản phẩm " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize());
            billHistory.setAccount(userLogin.getUserLogin());
            hdBillHistoryRepository.save(billHistory);
            hdBillDetailRepository.save(billDetail);
        }
        List<HDBillDetailResponse> listBillDetail = hdBillDetailRepository.getBillDetailsByBillId(bill.getId());

        BigDecimal totalAmount = listBillDetail.stream()
                .filter(item -> item.getStatus() == 0)
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        bill.setTotalMoney(totalAmount);
        BigDecimal tienCanThanhToan = totalAmount;
        if (bill.getMoneyReduced() != null) {
            tienCanThanhToan = totalAmount.subtract(bill.getMoneyReduced());
        }
        if (bill.getMoneyShip() != null) {
            tienCanThanhToan = totalAmount.add(bill.getMoneyShip());
        }
        bill.setMoneyAfter(tienCanThanhToan);
        hdBillRepositpory.save(bill);
        return billDetail;
    }

    @Override
    public BillDetail changeQuantity(String idBillDetail, Integer quantity) {
        BillDetail billDetail = hdBillDetailRepository.findById(idBillDetail).get();
        ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).get();
        Bill bill = hdBillRepositpory.findById(billDetail.getBill().getId()).get();

        if (bill.getStatus() == 1) {
            billDetail.setQuantity(quantity);
            return hdBillDetailRepository.save(billDetail);
        } else {
            if (!(Objects.equals(billDetail.getQuantity(), quantity))) {
                if (billDetail.getQuantity() > quantity) {
                    Integer differenceQuantity = billDetail.getQuantity() - quantity;
                    productDetail.setAmount(productDetail.getAmount() + differenceQuantity);
                    productDetailRepository.save(productDetail);
                    billDetail.setQuantity(quantity);
                    BillHistory billHistory = new BillHistory();
                    billHistory.setBill(bill);
                    billHistory.setNote("Đã xoá " + quantity + " sản phẩm " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize());
                    billHistory.setAccount(userLogin.getUserLogin());
                    hdBillHistoryRepository.save(billHistory);
                    hdBillDetailRepository.save(billDetail);
                } else {
                    Integer differenceQuantity = quantity - billDetail.getQuantity();
                    productDetail.setAmount(productDetail.getAmount() - differenceQuantity);
                    productDetailRepository.save(productDetail);
                    BillHistory billHistory = new BillHistory();
                    billHistory.setBill(bill);
                    billHistory.setNote("Đã thêm " + quantity + " sản phẩm " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize());
                    billHistory.setAccount(userLogin.getUserLogin());
                    hdBillHistoryRepository.save(billHistory);
                    billDetail.setQuantity(quantity);
                }
            }
        }
        List<HDBillDetailResponse> listBillDetail = hdBillDetailRepository.getBillDetailsByBillId(bill.getId());

        BigDecimal totalAmount = listBillDetail.stream()
                .filter(item -> item.getStatus() == 0)
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        bill.setTotalMoney(totalAmount);
        BigDecimal tienCanThanhToan = totalAmount;
        if (bill.getMoneyReduced() != null) {
            tienCanThanhToan = totalAmount.subtract(bill.getMoneyReduced());
        }
        if (bill.getMoneyShip() != null) {
            tienCanThanhToan = totalAmount.add(bill.getMoneyShip());
        }
        bill.setMoneyAfter(tienCanThanhToan);
        hdBillRepositpory.save(bill);
        return billDetail;
    }

    @Transactional
    @Override
    public Boolean delete(HDBillDetailRequest hdBillDetailRequest) {
        try {
            Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
            if (bill.getStatus() == 1 || bill.getStatus() == 2 || bill.getStatus() == 6) {
                BillDetail billDetail = hdBillDetailRepository.getBillDetailByBillIdAndProductDetailId(hdBillDetailRequest.getIdBill(), hdBillDetailRequest.getProductDetailId());
                billDetail.setStatus(1);
                ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).get();
                if (bill.getStatus() != 1) {
                    productDetail.setAmount(productDetail.getAmount() + hdBillDetailRequest.getQuantity());
                    productDetailRepository.save(productDetail);
                }
                BillHistory billHistory = BillHistory.builder()
                        .bill(bill)
                        .account(userLogin.getUserLogin())
                        .note("Đã xoá sản phẩm " + hdBillDetailRequest.getQuantity() + " " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize())
                        .build();
                hdBillHistoryRepository.save(billHistory);
                hdBillDetailRepository.delete(billDetail);
                List<HDBillDetailResponse> listBillDetail = hdBillDetailRepository.getBillDetailsByBillId(bill.getId());

                BigDecimal totalAmount = listBillDetail.stream()
                        .filter(item -> item.getStatus() == 0)
                        .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

                bill.setTotalMoney(totalAmount);
                BigDecimal tienCanThanhToan = totalAmount;
                if (bill.getMoneyReduced() != null) {
                    tienCanThanhToan = totalAmount.subtract(bill.getMoneyReduced());
                }
                if (bill.getMoneyShip() != null) {
                    tienCanThanhToan = totalAmount.add(bill.getMoneyShip());
                }
                bill.setMoneyAfter(tienCanThanhToan);
                hdBillRepositpory.save(bill);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean returnProduct(String idBillDetail, HDBillDetailRequest hdBillDetailRequest) {
        try {
            BillHistory billHistory = new BillHistory();
            billHistory.setAccount(userLogin.getUserLogin());
            BillDetail billDetail = hdBillDetailRepository.findById(idBillDetail).get();
            Bill bill = billDetail.getBill();
            billHistory.setBill(bill);
            if (billDetail.getQuantity() == hdBillDetailRequest.getQuantity()) {
                billDetail.setStatus(1);
                billDetail.setNote(hdBillDetailRequest.getNote());
                hdBillDetailRepository.save(billDetail);
                billHistory.setNote(hdBillDetailRequest.getNote());
                hdBillHistoryRepository.save(billHistory);
            } else {
                billDetail.setQuantity(billDetail.getQuantity() - hdBillDetailRequest.getQuantity());
                hdBillDetailRepository.save(billDetail);
                BillDetail newBillDetail = BillDetail.builder()
                        .quantity(hdBillDetailRequest.getQuantity())
                        .bill(bill)
                        .price(billDetail.getPrice())
                        .productDetail(billDetail.getProductDetail())
                        .note(hdBillDetailRequest.getNote())
                        .build();
                newBillDetail.setStatus(1);
                hdBillDetailRepository.save(newBillDetail);
                billHistory.setNote("Hoàn " + hdBillDetailRequest.getQuantity() + " sản phẩm " + billDetail.getProductDetail().getProduct().getName() + " - " + billDetail.getProductDetail().getSize().getSize() + " - " + billDetail.getProductDetail().getColor().getName());
                hdBillHistoryRepository.save(billHistory);
            }
            ProductDetail detail = billDetail.getProductDetail();
            detail.setAmount(detail.getAmount() + hdBillDetailRequest.getQuantity());
            productDetailRepository.save(detail);
            List<HDBillDetailResponse> listBillDetail = hdBillDetailRepository.getBillDetailsByBillId(bill.getId());

            BigDecimal totalAmount = listBillDetail.stream()
                    .filter(item -> item.getStatus() != 1)
                    .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            bill.setTotalMoney(totalAmount);
            BigDecimal tienCanThanhToan = totalAmount;
            if (bill.getMoneyReduced() != null) {
                tienCanThanhToan = totalAmount.subtract(bill.getMoneyReduced());
            }
            if (bill.getMoneyShip() != null) {
                tienCanThanhToan = tienCanThanhToan.add(bill.getMoneyShip());
            }
            bill.setMoneyAfter(tienCanThanhToan);
            hdBillRepositpory.save(bill);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }


}
