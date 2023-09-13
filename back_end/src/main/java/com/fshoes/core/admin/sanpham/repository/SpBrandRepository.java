package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.BrandResponse;
import com.fshoes.repository.BrandRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SpBrandRepository extends BrandRepository {

    @Query(value = "select id, name, deleted from brand where name like %:textSearch%", nativeQuery = true)
    Page<BrandResponse> getPageBrand(Pageable pageable,@Param("textSearch") String textSeacrh);

    @Query(value = "select id, name, deleted from brand where id = :id", nativeQuery = true)
    BrandResponse getBardById(@Param("id") String id);

    @Query(value = "select id, name, deleted from Brand where deleted = 0", nativeQuery = true)
    List<BrandResponse> getAll();
}
