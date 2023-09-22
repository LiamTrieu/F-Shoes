package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.service.MaterialService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/material")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping("/find-all")
    public ObjectRespone findAll() {
        return new ObjectRespone(materialService.findAll());
    }

    @GetMapping("/get-list")
    public ObjectRespone getListMaterial() {
        return new ObjectRespone(materialService.getListMaterial());
    }

}
