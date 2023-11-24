package com.fshoes.core.admin.sell.repository;

import com.fshoes.entity.Transaction;
import com.fshoes.repository.TransactionRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface AdminTransactionRepository extends TransactionRepository {

    @Query(value = """
    SELECT * from transaction t where t.id_bill = :idBill 
""",nativeQuery = true)
    List<Transaction> getTransactionByIdBill(String idBill);
}
