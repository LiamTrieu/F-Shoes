package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepository;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.ProductDetail;
import com.fshoes.infrastructure.constant.StatusBillDetail;
import com.fshoes.repository.ProductDetailRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Transactional
    @Override
    public BillDetail save(HDBillDetailRequest hdBillDetailRequest) {

        Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
        ProductDetail productDetail = productDetailRepository.findById(hdBillDetailRequest.getProductDetailId()).get();

        BillDetail billDetail = hdBillDetailRepository.getBillDetailByBillIdAndProductDetailId(hdBillDetailRequest.getIdBill(), hdBillDetailRequest.getProductDetailId());
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill);

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
            }
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
        if (bill.getMoneyReduced() != null) {
            BigDecimal moneyAfter = bill.getTotalMoney().subtract(bill.getMoneyReduced()).add(bill.getMoneyShip());
            bill.setMoneyAfter(moneyAfter);
        } else {
            BigDecimal moneyAfter = bill.getTotalMoney().add(bill.getMoneyShip());
            bill.setMoneyAfter(moneyAfter);
        }
        if (bill.getStatus() == 1) {
            billDetail.setQuantity(billDetail.getQuantity() - 1);
            return hdBillDetailRepository.save(billDetail);
        } else {
            billDetail.setQuantity(billDetail.getQuantity() - 1);
            ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).get();
            productDetail.setAmount(productDetail.getAmount() + 1);
            productDetailRepository.save(productDetail);
            return hdBillDetailRepository.save(billDetail);
        }

    }

    @Override
    public BillDetail incrementQuantity(String idBillDetail) {
        BillDetail billDetail = hdBillDetailRepository.findById(idBillDetail).get();
        Bill bill = hdBillRepositpory.findById(billDetail.getBill().getId()).get();
        if (bill.getMoneyReduced() != null) {
            BigDecimal moneyAfter = bill.getTotalMoney().subtract(bill.getMoneyReduced()).add(bill.getMoneyShip());
            bill.setMoneyAfter(moneyAfter);
        } else {
            BigDecimal moneyAfter = bill.getTotalMoney().add(bill.getMoneyShip());
            bill.setMoneyAfter(moneyAfter);
        }
        if (bill.getStatus() == 1) {
            billDetail.setQuantity(billDetail.getQuantity() + 1);
            return hdBillDetailRepository.save(billDetail);
        } else {
            billDetail.setQuantity(billDetail.getQuantity() + 1);
            ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).get();
            productDetail.setAmount(productDetail.getAmount() - 1);
            productDetailRepository.save(productDetail);
            return hdBillDetailRepository.save(billDetail);
        }
    }

    @Override
    public BillDetail changeQuantity(String idBillDetail, Integer quantity) {
        BillDetail billDetail = hdBillDetailRepository.findById(idBillDetail).get();
        ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).get();
        Bill bill = hdBillRepositpory.findById(billDetail.getBill().getId()).get();
        if (bill.getMoneyReduced() != null) {
            BigDecimal moneyAfter = bill.getTotalMoney().subtract(bill.getMoneyReduced()).add(bill.getMoneyShip());
            bill.setMoneyAfter(moneyAfter);
        } else {
            BigDecimal moneyAfter = bill.getTotalMoney().add(bill.getMoneyShip());
            bill.setMoneyAfter(moneyAfter);
        }
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
                    hdBillDetailRepository.save(billDetail);
                    return billDetail;
                } else {
                    Integer differenceQuantity = quantity - billDetail.getQuantity();
                    productDetail.setAmount(productDetail.getAmount() - differenceQuantity);
                    productDetailRepository.save(productDetail);
                    billDetail.setQuantity(quantity);
                    hdBillDetailRepository.save(billDetail);
                    return billDetail;
                }
            }
        }
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
                BillHistory billHistory = BillHistory.builder()
                        .bill(bill)
                        .note("Đã xoá sản phẩm " + productDetail.getProduct().getName() + " - " + productDetail.getColor().getName() + " - " + productDetail.getSize().getSize())
                        .build();
                hdBillHistoryRepository.save(billHistory);
                hdBillDetailRepository.save(billDetail);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
