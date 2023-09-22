package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.service.CategoryService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/find-all")
    public ObjectRespone findAll() {
        return new ObjectRespone(categoryService.findAll());
    }

    @GetMapping("get-list")
    public ObjectRespone getListBrand() {
        return new ObjectRespone(categoryService.getListCategory());
    }
}
