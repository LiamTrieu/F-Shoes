package com.fshoes.core.app;

import com.fshoes.entity.Bill;
import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.repository.BillRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppBillOrderRepository extends BillRepository {

    Optional<Bill> findBillByStatusAndCustomerId(StatusBill status, String customerId);

    Optional<Bill> findBillByStatusAndCode(StatusBill status, String code);
}
