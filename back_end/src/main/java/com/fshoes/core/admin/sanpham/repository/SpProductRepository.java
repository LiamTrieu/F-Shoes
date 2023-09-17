package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SpProductRepository extends ProductRepository {

    @Query(value = "select id, name, deleted, created_at as createAt from product where name like %:textSearch%", nativeQuery = true)
    Page<ProductResponse> getPageProduct(Pageable pageable,@Param("textSearch") String textSeacrh);

    @Query(value = "select id, name, deleted, created_at as createAt from product where id = :id", nativeQuery = true)
    Optional<ProductResponse> productById(@Param("id") String id);

    @Query(value = "select id, name, deleted from product where !deleted", nativeQuery = true)
    List<ProductResponse> getAll();
}
