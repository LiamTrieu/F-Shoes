package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.entity.BillDetail;
import com.fshoes.repository.BillDetailRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDBillDetailRepository extends BillDetailRepository {

    List<BillDetail> getBillDetailsByBillId(String idBill);

    List<BillDetail> getBillDetailsByBillIdAndStatus(String idBill, Integer status);

    BillDetail getBillDetailByBillIdAndProductDetailId(String idBill, String idProductDetail);

}
