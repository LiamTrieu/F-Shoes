package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.entity.BillDetail;

import java.util.List;

public interface HDBillDetailService {
    BillDetail save(HDBillDetailRequest hdBillDetailRequest);

    List<BillDetail> getBillDetailByBillId(Integer idBill);

    BillDetail updateBillDetail(Integer idBillDetail, HDBillDetailRequest hdBillDetailRequest);

    List<BillDetail> getBillDetailByBillIdAndStatus(Integer idBill, Integer status);

}
