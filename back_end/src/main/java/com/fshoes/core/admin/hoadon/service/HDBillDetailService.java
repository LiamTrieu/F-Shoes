package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.entity.BillDetail;

import java.util.List;

public interface HDBillDetailService {
    BillDetail save(HDBillDetailRequest hdBillDetailRequest);

    List<HDBillDetailResponse> getBillDetailByBillId(String idBill);

    BillDetail updateBillDetail(String idBillDetail, HDBillDetailRequest hdBillDetailRequest);

    List<HDBillDetailResponse> getBillDetailByBillIdAndStatus(String idBill, Integer status);

    BillDetail getBillDetailByBillIdAndProductDetailId(String idBill, String idProductDetail);

    BillDetail decrementQuantity(String idBillDetail);

    BillDetail incrementQuantity(String idBillDetail);

    BillDetail changeQuantity(String idBillDetail, Integer quantity);

    Boolean delete(HDBillDetailRequest hdBillDetailRequest);

    Boolean returnProduct(String idBillDetail, HDBillDetailRequest hdBillDetailRequest);

}
