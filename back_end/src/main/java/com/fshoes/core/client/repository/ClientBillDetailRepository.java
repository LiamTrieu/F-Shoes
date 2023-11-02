package com.fshoes.core.client.repository;

import com.fshoes.entity.BillDetail;
import com.fshoes.repository.BillDetailRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientBillDetailRepository extends BillDetailRepository {
    List<BillDetail> findAllByBillId(String billId);
}
