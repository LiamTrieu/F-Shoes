package com.fshoes.core.admin.sell.repository;

import com.fshoes.entity.Bill;
import com.fshoes.repository.BillRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminBillRepository extends BillRepository {

    Boolean existsByCode(String code);

    @Query(value = """
            select * from bill where status = 8
            """, nativeQuery = true)
    List<Bill> getAllBillTaoDonHang();
}
