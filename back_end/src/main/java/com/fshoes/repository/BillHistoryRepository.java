package com.fshoes.repository;

import com.fshoes.entity.Bill_History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillHistoryRepository extends JpaRepository<Bill_History,Integer> {
}
