package com.fshoes.repository;

import com.fshoes.entity.Cart_Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDetailRepository extends JpaRepository<Cart_Detail,Integer> {
}
