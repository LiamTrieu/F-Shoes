package com.fshoes.core.admin.returns.repository;

import com.fshoes.repository.BillRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BillReturnRepository extends BillRepository {

    @Query(value = """
            SELECT b.id
            FROM bill b
            WHERE b.code = :code
              AND b.status = 7
              AND b.id_voucher is null
              AND b.complete_date >= :date
              AND NOT EXISTS (SELECT 1 FROM bill_detail WHERE id_bill = b.id AND status = 2)
            """, nativeQuery = true)
    String getBillReturn(@Param("code") String code, @Param("date") Long date);
}
