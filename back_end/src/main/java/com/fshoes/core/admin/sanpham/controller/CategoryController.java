package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.CategoryRequest;
import com.fshoes.core.admin.sanpham.service.CategoryService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.PageableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ObjectRespone getAll() {
        return new ObjectRespone(categoryService.getAll());
    }

    @GetMapping("/page")
    public PageReponse getPageCategory(PageableRequest pageableRequest,
                                       @RequestParam(defaultValue = "") String textSearch) {
        return new PageReponse<>(categoryService.getPage(pageableRequest, textSearch));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getCategory(@PathVariable int id) {
        return new ObjectRespone(categoryService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addCategory(@RequestBody CategoryRequest categoryReq) {
        return new ObjectRespone(categoryService.addCategory(categoryReq));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateCategory(@RequestBody CategoryRequest categoryReq,
                                        @PathVariable int id) {
        return new ObjectRespone(categoryService.updateCategory(categoryReq, id));
    }

    @PutMapping("/deleted/{id}")
    public ObjectRespone deletedProduct(@RequestBody boolean isDeleted,
                                        @PathVariable int id) {
        return new ObjectRespone(categoryService.chageDeleted(id, isDeleted));
    }
}
