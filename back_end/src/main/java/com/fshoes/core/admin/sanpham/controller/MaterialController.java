package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.MaterialRequest;
import com.fshoes.core.admin.sanpham.service.MaterialService;
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
@RequestMapping("/api/material")
@CrossOrigin("*")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping
    public ObjectRespone getAll(){
        return new ObjectRespone(materialService.getAll());
    }

    @GetMapping("/page")
    public PageReponse getPageMaterial(PageableRequest pageableRequest,
                                       @RequestParam(defaultValue = "") String textSearch) {
        return new PageReponse<>(materialService.getPage(pageableRequest, textSearch));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getMaterial(@PathVariable int id){
        return new ObjectRespone(materialService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addMaterial(@RequestBody MaterialRequest materialReq){
        return new ObjectRespone(materialService.addMaterial(materialReq));
    }
    @PutMapping ("/update/{id}")
    public ObjectRespone updateMaterial(@RequestBody MaterialRequest materialReq,
                                        @PathVariable int id){
        return new ObjectRespone(materialService.updateMaterial(materialReq, id));
    }
}
