package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.entity.Transaction;
import com.fshoes.repository.TransactionRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDTransactionRepository extends TransactionRepository {
    List<Transaction> getTransactionByBillId(Integer idBill);

}
