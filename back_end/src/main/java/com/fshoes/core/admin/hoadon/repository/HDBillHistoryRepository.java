package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.entity.Bill_History;
import com.fshoes.repository.BillHistoryRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDBillHistoryRepository extends BillHistoryRepository {
    List<Bill_History> getBill_HistoriesByBill_Id(Integer idBill);

}
