package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.service.SoleService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sole")
public class SoleController {

    @Autowired
    private SoleService soleService;

    @GetMapping("/find-all")
    public ObjectRespone findAll() {
        return new ObjectRespone(soleService.findAll());
    }

    @GetMapping("/get-list")
    public ObjectRespone getListSole() {
        return new ObjectRespone(soleService.getListSole());
    }

}
