package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.core.client.service.ClientCheckoutService;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.ProductDetail;
import com.fshoes.repository.BillDetailRepository;
import com.fshoes.repository.BillHistoryRepository;
import com.fshoes.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class ClientCheckoutServiceImpl implements ClientCheckoutService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Override
    public Bill thanhToan(ClientCheckoutRequest request) {
        Bill newBill = new Bill();
        newBill.setStatus(1);
        newBill.setNote(request.getNote());
        newBill.setFullName(request.getFullName());
        newBill.setPhoneNumber(request.getPhone());
        StringBuilder diaChi = new StringBuilder();
        newBill.setAddress(diaChi.append(request.getAddress())
                .append(" ,")
                .append(request.getXa())
                .append(" ,")
                .append(request.getHuyen())
                .append(" ,")
                .append(request.getTinh())
                .toString());
        newBill.setTotalMoney(new BigDecimal(request.getTotalMoney()));
        newBill.setMoneyAfter(new BigDecimal(request.getTotalMoney()));
        newBill.setCode("HD" + Calendar.getInstance().getTimeInMillis());
        newBill.setType(1);
        newBill.setMoneyReduced(BigDecimal.ZERO);
        newBill.setMoneyShip(new BigDecimal(request.getShipMoney()));
        newBill.setDesiredReceiptDate(request.getDuKien());
        billRepository.save(newBill);
        List<BillDetail> billDetails = request.getBillDetail().stream().map(bd -> {
            BillDetail billDetail = new BillDetail();
            billDetail.setBill(newBill);
            billDetail.setQuantity(bd.getQuantity());
            billDetail.setStatus(0);
            billDetail.setPrice(new BigDecimal(bd.getPrice()));
            ProductDetail productDetail = new ProductDetail();
            productDetail.setId(bd.getIdProduct());
            billDetail.setProductDetail(productDetail);
            return billDetail;
        }).toList();
        billDetailRepository.saveAll(billDetails);
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(newBill);
        billHistory.setStatusBill(newBill.getStatus());
        billHistory.setNote(request.getNote());
        billHistoryRepository.save(billHistory);
        return newBill;
    }
}
