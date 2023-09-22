package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.service.ColorService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/color")
public class ColorController {

    @Autowired
    private ColorService ColorService;

    @GetMapping("/find-all")
    public ObjectRespone findAll() {
        return new ObjectRespone(ColorService.findAll());
    }

    @GetMapping("/get-list")
    public ObjectRespone getListColor() {
        return new ObjectRespone(ColorService.getListColor());
    }

}
