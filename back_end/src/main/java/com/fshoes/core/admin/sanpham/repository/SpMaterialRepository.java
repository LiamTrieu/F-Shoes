package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.MaterialResponse;
import com.fshoes.repository.MaterialRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SpMaterialRepository extends MaterialRepository {

    @Query(value = "select id, name, deleted from material where name like %:textSearch%", nativeQuery = true)
    Page<MaterialResponse> getPageMaterial(Pageable pageable,@Param("textSearch") String textSeacrh);

    @Query(value = "select id, name, deleted from material where id = :id", nativeQuery = true)
    Optional<MaterialResponse> materialById(@Param("id") String id);

    @Query(value = "select id, name, deleted from material where !deleted", nativeQuery = true)
    List<MaterialResponse> getAll();
}
