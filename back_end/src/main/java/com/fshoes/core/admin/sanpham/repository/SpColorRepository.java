package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.ColorResponse;
import com.fshoes.repository.ColorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SpColorRepository extends ColorRepository {

    @Query(value = "select id, code, deleted from color where code like %:textSearch%", nativeQuery = true)
    Page<ColorResponse> getPageColor(Pageable pageable,@Param("textSearch") String textSeacrh);

    @Query(value = "select id, code, deleted from color where id = :id", nativeQuery = true)
    Optional<ColorResponse> getById(@Param("id") int id);
}
