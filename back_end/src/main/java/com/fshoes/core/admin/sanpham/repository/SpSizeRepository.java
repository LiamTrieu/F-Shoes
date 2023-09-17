package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.SizeResponse;
import com.fshoes.repository.SizeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SpSizeRepository extends SizeRepository {

    @Query(value = "select id, size, deleted from size where size like %:textSearch%", nativeQuery = true)
    Page<SizeResponse> getPageSize(Pageable pageable,@Param("textSearch") String textSeacrh);

    @Query(value = "select id, size, deleted from size where id = :id", nativeQuery = true)
    Optional<SizeResponse> sizeById(@Param("id") String id);

    @Query(value = "select id, size, deleted from size where !deleted", nativeQuery = true)
    List<SizeResponse> getAll();
}
