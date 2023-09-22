package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.service.SizeService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/size")
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping("/find-all")
    public ObjectRespone findAll() {
        return new ObjectRespone(sizeService.findAll());
    }

    @GetMapping("/get-list")
    public ObjectRespone getListSize() {
        return new ObjectRespone(sizeService.getListSize());
    }

}
