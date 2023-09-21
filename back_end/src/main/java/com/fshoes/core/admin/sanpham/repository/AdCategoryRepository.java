package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.entity.Category;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.repository.CategoryRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdCategoryRepository extends CategoryRepository {
    List<Category> findAllByDeleted(Status status);
}
