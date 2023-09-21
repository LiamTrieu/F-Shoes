package com.fshoes.core.admin.sanpham.service;

import com.fshoes.entity.Category;
import com.fshoes.infrastructure.constant.Status;

import java.util.List;

public interface CategoryService {
    List<Category> findAll();

    List<Category> getListCategory();
}
