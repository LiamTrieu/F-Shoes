package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.core.admin.hoadon.model.respone.HDBillHistoryResponse;
import com.fshoes.entity.BillHistory;
import com.fshoes.repository.BillHistoryRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDBillHistoryRepository extends BillHistoryRepository {

    @Query(value = """
            SELECT bh.id, bh.created_at as createdAt, bh.status_bill as statusBill,
            bh.note as note, bh.created_by as createdBy, a.email as email, a.full_name as fullName
            FROM bill_history bh 
            LEFT JOIN bill b ON bh.id_bill = b.id
            LEFT OUTER JOIN account a on a.id = bh.id_account
            WHERE b.id = :idBill    
            ORDER BY bh.created_at ASC                  
            """, nativeQuery = true)
    List<HDBillHistoryResponse> getListBillHistoryByIdBill(@Param("idBill") String idBill);

    @Query(value = """
    select  id from bill_history where id_bill = ?;
""",nativeQuery = true)
    List<String> getIdHistoryByIdBill(String idBill);
}
