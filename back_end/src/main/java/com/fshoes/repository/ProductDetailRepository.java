package com.fshoes.repository;

import com.fshoes.entity.Product_Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailRepository extends JpaRepository<Product_Detail,Integer> {
}
