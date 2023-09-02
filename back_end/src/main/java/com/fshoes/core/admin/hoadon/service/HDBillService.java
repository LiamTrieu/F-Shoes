package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.entity.Bill;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.text.ParseException;

public interface HDBillService {
    Page<HDBillResponse> getAllBill(Integer pageNo);

    Page<HDBillResponse> getAllBillOrderByTotalMoney(Integer pageNo);

    Page<HDBillResponse> searchBillByInputText(Integer pageNo, String inputSearch);

    Page<HDBillResponse> getBillByType(Integer pageNo, String type);

    Page<HDBillResponse> getBillByStatus(Integer pageNo, Integer status);

    Page<HDBillResponse> getBillByDateRange(Integer pageNo, String startDate, String endDate) throws ParseException;

    Page<HDBillResponse> getBillByTotalMoneyRange(Integer pageNo, BigDecimal minPrice, BigDecimal maxPrice);

    Page<HDBillResponse> getBillByStatusAndDateRange(Integer pageNo, Integer status, String startDate, String endDate) throws ParseException;

    Bill createBill();

    Bill updateBill(Integer idBill, HDBillRequest hdBillRequest);

    Bill cancelOrder(Integer idBill, HDBillRequest hdBillRequest);

    Bill getOne(Integer id);

}
