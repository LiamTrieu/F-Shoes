package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepository;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.ProductDetail;
import com.fshoes.infrastructure.constant.StatusBillDetail;
import com.fshoes.repository.ProductDetailRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HDBillDetailServiceImpl implements HDBillDetailService {

    @Autowired
    private HDBillDetailRepository hdBillDetailRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private HDBillRepository hdBillRepositpory;

    @Transactional
    @Override
    public BillDetail save(HDBillDetailRequest hdBillDetailRequest) {
        Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
        ProductDetail productDetail = productDetailRepository.findById(hdBillDetailRequest.getProductDetailId()).get();
        BillDetail billDetail = BillDetail.builder()
                .bill(bill)
                .productDetail(productDetail)
                .price(hdBillDetailRequest.getPrice())
                .quantity(hdBillDetailRequest.getQuantity())
                .status(StatusBillDetail.values()[hdBillDetailRequest.getStatus()])
                .build();
        return hdBillDetailRepository.save(billDetail);
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
        if (bill.getStatus() == 1) {
            billDetail.setQuantity(quantity);
            return hdBillDetailRepository.save(billDetail);
        } else {
            if (!(billDetail.getQuantity() == quantity)) {
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

}
