package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.entity.BillDetail;

import java.util.List;

public interface HDBillDetailService {
    Boolean save(HDBillDetailRequest hdBillDetailRequest);

    List<HDBillDetailResponse> getBillDetailByBillId(String idBill);

    BillDetail updateBillDetail(String idBillDetail, HDBillDetailRequest hdBillDetailRequest);

    BillDetail getBillDetailByBillIdAndProductDetailId(String idBill, String idProductDetail);

    BillDetail decrementQuantity(String idBillDetail);

    BillDetail incrementQuantity(String idBillDetail);

    BillDetail changeQuantity(String idBillDetail, Integer quantity);

    Boolean delete(HDBillDetailRequest hdBillDetailRequest);

    Boolean returnProduct(String idBillDetail, HDBillDetailRequest hdBillDetailRequest);

    List<HDBillDetailResponse> getBillDtResByIdBillAndIDPrd(String idBill, String idPrd);

    HDBillDetailResponse getBillDtResByIdBillAndIDPrdAndPrice(String idBill, String idPrd, String price);

}
