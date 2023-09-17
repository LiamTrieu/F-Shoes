package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.core.admin.hoadon.model.respone.HDBillHistoryResponse;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepositpory;
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
    private HDBillRepositpory hdBillRepositpory;

    @Transactional
    @Override
    public BillDetail save(HDBillDetailRequest hdBillDetailRequest) {
        Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
        ProductDetail productDetail = productDetailRepository.findById(hdBillDetailRequest.getIdProductDetail()).get();
        BillDetail billDetail = BillDetail.builder()
                .bill(bill)
                .productDetail(productDetail)
                .price(hdBillDetailRequest.getPrice())
                .quantity(hdBillDetailRequest.getQuanity())
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
        ProductDetail productDetail = productDetailRepository.findById(hdBillDetailRequest.getIdProductDetail()).get();

        billDetail.setBill(bill);
        billDetail.setProductDetail(productDetail);
        billDetail.setPrice(hdBillDetailRequest.getPrice());
        billDetail.setQuantity(hdBillDetailRequest.getQuanity());
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

}
