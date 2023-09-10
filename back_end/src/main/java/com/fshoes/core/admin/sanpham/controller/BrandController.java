package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.BrandRequest;
import com.fshoes.core.admin.sanpham.service.BrandService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.util.DateUtil;
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
@RequestMapping("/api/brand")
@CrossOrigin("*")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping
    public ObjectRespone getAll(){
        return new ObjectRespone(brandService.getAll());
    }

    @GetMapping("/page")
    public PageReponse getPageBrand(PageableRequest pageableRequest,
                                    @RequestParam(defaultValue = "") String textSearch) {
        return new PageReponse<>(brandService.getPage(pageableRequest, textSearch));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getBrand(@PathVariable int id){
        return new ObjectRespone(brandService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addBrand(@RequestBody BrandRequest brandReq){
        return new ObjectRespone(brandService.addBrand(brandReq));
    }
    @PutMapping ("/update/{id}")
    public ObjectRespone updateBrand(@RequestBody BrandRequest brandReq,
                                        @PathVariable int id){
        return new ObjectRespone(brandService.updateBrand(brandReq, id));
    }
}
