package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.ColorRequest;
import com.fshoes.core.admin.sanpham.service.ColorService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.PageableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/color")
public class ColorController {

    @Autowired
    private ColorService colorService;

    @GetMapping
    public ObjectRespone getAll(){
        return new ObjectRespone(colorService.getAll());
    }

    @GetMapping("/page")
    public PageReponse getPageColor(PageableRequest pageableRequest,
                                       @RequestParam(defaultValue = "") String textSearch) {
        return new PageReponse<>(colorService.getPage(pageableRequest, textSearch));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getColor(@PathVariable String id) {
        return new ObjectRespone(colorService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addColor(@RequestBody ColorRequest colorReq){
        return new ObjectRespone(colorService.addColor(colorReq));
    }
    @PutMapping("/deleted/{id}")
    public ObjectRespone deletedColor(@RequestBody Integer isDeleted,
                                      @PathVariable String id) {
        return new ObjectRespone(colorService.chageDeleted(id,isDeleted));
    }
}
