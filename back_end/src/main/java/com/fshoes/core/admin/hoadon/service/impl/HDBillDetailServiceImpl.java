package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.repository.HDBillDetailRepository;
import com.fshoes.core.admin.hoadon.repository.HDBillRepositpory;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.entity.Bill;
import com.fshoes.entity.Bill_Detail;
import com.fshoes.entity.Product_Detail;
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
    public Bill_Detail save(HDBillDetailRequest hdBillDetailRequest) {
        Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
        Product_Detail productDetail = productDetailRepository.findById(hdBillDetailRequest.getIdProductDetail()).get();
        Bill_Detail billDetail = Bill_Detail.builder()
                .bill(bill)
                .productDetail(productDetail)
                .price(hdBillDetailRequest.getPrice())
                .quantity(hdBillDetailRequest.getQuanity())
                .status(hdBillDetailRequest.getStatus())
                .build();
        return hdBillDetailRepository.save(billDetail);
    }

    @Override
    public List<Bill_Detail> getBill_DetailByBill_Id(Integer idBill) {
        return hdBillDetailRepository.getBill_DetailByBill_Id(idBill);
    }

    @Override
    public Bill_Detail updateBillDetail(Integer idBillDetail, HDBillDetailRequest hdBillDetailRequest) {

        Bill_Detail billDetail = hdBillDetailRepository.findById(idBillDetail).orElseThrow(() -> new RuntimeException("Khong tim thay bill detail"));

        Bill bill = hdBillRepositpory.findById(hdBillDetailRequest.getIdBill()).get();
        Product_Detail productDetail = productDetailRepository.findById(hdBillDetailRequest.getIdProductDetail()).get();

        billDetail.setBill(bill);
        billDetail.setProductDetail(productDetail);
        billDetail.setPrice(hdBillDetailRequest.getPrice());
        billDetail.setQuantity(hdBillDetailRequest.getQuanity());
        billDetail.setStatus(hdBillDetailRequest.getStatus());

        return hdBillDetailRepository.save(billDetail);

    }

    @Override
    public List<Bill_Detail> getBill_DetailByBill_IdAndStatus(Integer idBill, Integer status) {
        return hdBillDetailRepository.getBill_DetailByBill_IdAndStatus(idBill, status);
    }

}
