package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.ColorResponse;
import com.fshoes.repository.ColorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SPColorRepository extends ColorRepository {

    @Query(value = "select id, code, deleted from color ", nativeQuery = true)
    List<ColorResponse> getAllColor();

    @Query(value = "select id, code, deleted from color ", nativeQuery = true)
    Page<ColorResponse> getPageColor(Pageable pageable);


}
