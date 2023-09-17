package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.service.CategoryService;
import com.fshoes.entity.Category;
import com.fshoes.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
