package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.CategoryRequest;
import com.fshoes.core.admin.sanpham.model.respone.CategoryResponse;
import com.fshoes.core.admin.sanpham.repository.SpCategoryRepository;
import com.fshoes.core.admin.sanpham.service.CategoryService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Category;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private SpCategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAll() {
        return categoryRepository.getAll();
    }

    @Override
    public CategoryResponse getById(String id) {
        return categoryRepository.getCateById(id).orElse(null);
    }

    @Override
    public Page<CategoryResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("create_at");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return categoryRepository.getPageCategory(pageable, textSearch);
    }


    @Override
    public Category addCategory(CategoryRequest categoryReq) {
        try {
            Category category = categoryReq.tranCategory(new Category());
            return categoryRepository.save(category);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Category updateCategory(CategoryRequest categoryReq, String id) {
        try {
            Category category = categoryRepository.findById(id).orElseThrow();
            return categoryRepository.save(categoryReq.tranCategory(category));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Category chageDeleted(String id, Integer isDeleted) {
        try {
            Category category = categoryRepository.findById(id).orElseThrow();
            category.setDeleted(Status.values()[isDeleted]);
            return categoryRepository.save(category);
        } catch (Exception e) {
            return null;
        }
    }
}
