package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.entity.Bill_Detail;

import java.util.List;

public interface HDBillDetailService {
    Bill_Detail save(HDBillDetailRequest hdBillDetailRequest);

    List<Bill_Detail> getBill_DetailByBill_Id(Integer idBill);

    Bill_Detail updateBillDetail(Integer idBillDetail, HDBillDetailRequest hdBillDetailRequest);

    List<Bill_Detail> getBill_DetailByBill_IdAndStatus(Integer idBill, Integer status);

}
