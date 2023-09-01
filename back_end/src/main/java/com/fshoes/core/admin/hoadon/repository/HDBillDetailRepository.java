package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.entity.BillDetail;
import com.fshoes.repository.BillDetailRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDBillDetailRepository extends BillDetailRepository {

    List<BillDetail> getBill_DetailByBill_Id(Integer idBill);

    List<BillDetail> getBill_DetailByBill_IdAndStatus(Integer idBill, Integer status);

}
