package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.core.admin.hoadon.model.respone.HDTransactionResponse;
import com.fshoes.entity.Transaction;
import com.fshoes.repository.TransactionRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDTransactionRepository extends TransactionRepository {
    @Query(value = """
            SELECT ts.id, ts.total_money as totalMoney, ts.type as type, ts.payment_method as paymentMethod,
            		ts.status as status, ts.note as note, st.full_name as fullName
            FROM transaction ts 
                LEFT JOIN staff st ON ts.id_staff = st.id
                LEFT JOIN bill b ON ts.id_bill = b.id
            WHERE b.id = :idBill
            """, nativeQuery = true)
    List<HDTransactionResponse> getTransactionByBillId(@Param("idBill") String idBill);

}
