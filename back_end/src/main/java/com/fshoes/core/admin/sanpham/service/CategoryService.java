package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.CategoryRequest;
import com.fshoes.core.admin.sanpham.model.respone.CategoryResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAll();

    CategoryResponse getById(int id);

    Page<CategoryResponse> getPage(PageableRequest pageableRequest, String textSearch);

    Category addCategory(CategoryRequest categoryReq);

    Category updateCategory(CategoryRequest categoryReq, int id);
}
