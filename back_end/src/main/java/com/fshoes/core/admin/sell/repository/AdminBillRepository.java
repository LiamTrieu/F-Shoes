package com.fshoes.core.admin.sell.repository;

import com.fshoes.repository.BillRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminBillRepository extends BillRepository {

    Boolean existsByCode(String code);
}
