package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.respone.CategoryResponse;
import com.fshoes.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SpCategoryRepository extends CategoryRepository {

    @Query(value = "select id, name, deleted from category where name like %:textSearch%", nativeQuery = true)
    Page<CategoryResponse> getPageCategory(Pageable pageable,@Param("textSearch") String textSeacrh);

    @Query(value = "select id, name, deleted from category where id = :id", nativeQuery = true)
    Optional<CategoryResponse> getCateById(@Param("id") String id);

    @Query(value = "select id, name, deleted from category where !deleted", nativeQuery = true)
    List<CategoryResponse> getAll();
}
