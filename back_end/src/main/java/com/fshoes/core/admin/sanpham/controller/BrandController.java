package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.service.BrandService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/find-all")
    public ObjectRespone findAll() {
        return new ObjectRespone(brandService.findAll());
    }

    @GetMapping("get-list-brand")
    public ObjectRespone getListBrand() {
        return new ObjectRespone(brandService.getListBrand());
    }

}
