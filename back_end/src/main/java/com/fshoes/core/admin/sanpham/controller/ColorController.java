package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.respone.ColorResponse;
import com.fshoes.core.admin.sanpham.service.ColorService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.PageableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/color")
@CrossOrigin("*")
public class ColorController {

    @Autowired
    private ColorService colorService;

    @GetMapping
    public ObjectRespone getAllColor() {
        return new ObjectRespone(colorService.getAll());
    }

    @GetMapping("/page")
    public PageReponse getPageColor(PageableRequest pageableRequest) {
        return new PageReponse<>(colorService.getPage(pageableRequest));
    }

}
