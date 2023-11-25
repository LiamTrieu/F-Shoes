package com.fshoes.core.admin.returns.repository;

import com.fshoes.repository.BillRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BillReturnRepository extends BillRepository {

    @Query(value = """
            SELECT b.id
            FROM bill b
            JOIN bill_detail bd ON bd.id_bill = b.id
            LEFT JOIN returns r ON r.id_bill = b.id
            WHERE b.code = :code
              AND b.status = 7
              AND b.complete_date >= :date
              AND bd.status = 0
              AND NOT EXISTS (SELECT 1 FROM returns WHERE id_bill = b.id AND status <> 4)
            GROUP BY b.id;
            """, nativeQuery = true)
    String getBillReturn(@Param("code") String code,@Param("date") Long date);
}
