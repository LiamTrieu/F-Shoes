package com.fshoes.repository;

import com.fshoes.entity.Bill_Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillDetailRepository extends JpaRepository<Bill_Detail,Integer> {
}
