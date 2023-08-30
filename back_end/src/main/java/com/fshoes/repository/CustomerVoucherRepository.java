package com.fshoes.repository;

import com.fshoes.entity.Customer_Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerVoucherRepository extends JpaRepository<Customer_Voucher,Integer> {
}
