package com.fshoes.core.admin.returns.repository;

import com.fshoes.core.admin.returns.model.response.GetBillResponse;
import com.fshoes.repository.BillRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BillReturnRepository extends BillRepository {

    @Query(value = """
            select ROW_NUMBER() over (ORDER BY b.updated_at desc ) as stt,
            b.code as code, b.full_name as name, b.phone_number as phone, b.money_after as total
            from bill b where b.code like concat('%', :code, '%') and b.status = 7
            AND b.complete_date >= :date
            """, nativeQuery = true)
    Page<GetBillResponse> getBillReturn(@Param("code") String code,@Param("date") Long date, Pageable pageable);
}
