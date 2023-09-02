package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.entity.BillHistory;
import com.fshoes.repository.BillHistoryRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDBillHistoryRepository extends BillHistoryRepository {
    List<BillHistory> getBillHistoriesByBillId(Integer idBill);

}
