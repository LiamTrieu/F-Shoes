package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.entity.BillDetail;

import java.util.List;

public interface HDBillDetailService {
    BillDetail save(HDBillDetailRequest hdBillDetailRequest);

    List<BillDetail> getBill_DetailByBill_Id(Integer idBill);

    BillDetail updateBillDetail(Integer idBillDetail, HDBillDetailRequest hdBillDetailRequest);

    List<BillDetail> getBill_DetailByBill_IdAndStatus(Integer idBill, Integer status);

}
