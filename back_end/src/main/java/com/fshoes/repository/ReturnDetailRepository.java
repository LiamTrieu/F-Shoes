package com.fshoes.repository;

import com.fshoes.entity.ReturnDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnDetailRepository extends JpaRepository<ReturnDetail, String> {
}
