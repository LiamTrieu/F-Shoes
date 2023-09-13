package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.SoleResponse;
import com.fshoes.repository.SoleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SpSoleRepository extends SoleRepository {

    @Query(value = "select id, name, deleted from sole where name like %:textSearch%", nativeQuery = true)
    Page<SoleResponse> getPageSole(Pageable pageable,@Param("textSearch") String textSeacrh);

    @Query(value = "select id, name, deleted from sole where id = :id", nativeQuery = true)
    Optional<SoleResponse> soleById(@Param("id") String id);

    @Query(value = "select id, name, deleted from sole where !deleted", nativeQuery = true)
    List<SoleResponse> getAll();
}
