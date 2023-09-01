package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.entity.Bill_Detail;
import com.fshoes.repository.BillDetailRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDBillDetailRepository extends BillDetailRepository {

    List<Bill_Detail> getBill_DetailByBill_Id(Integer idBill);

    List<Bill_Detail> getBill_DetailByBill_IdAndStatus(Integer idBill, Integer status);

}
