package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.entity.BillDetail;

import java.util.List;

public interface HDBillDetailService {
    BillDetail save(HDBillDetailRequest hdBillDetailRequest);

    List<BillDetail> getBillDetailByBillId(String idBill);

    BillDetail updateBillDetail(String idBillDetail, HDBillDetailRequest hdBillDetailRequest);

    List<BillDetail> getBillDetailByBillIdAndStatus(String idBill, Integer status);

    BillDetail getBillDetailByBillIdAndProductDetailId(String idBill, String idProductDetail);

}
