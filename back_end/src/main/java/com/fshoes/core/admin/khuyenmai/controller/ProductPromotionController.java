package com.fshoes.core.admin.khuyenmai.controller;

import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.service.impl.ProductPromotionServiceImpl;
import com.fshoes.core.common.ObjectRespone;
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
@RequestMapping("/api/product-promotion")
public class ProductPromotionController {

    @Autowired

    private ProductPromotionServiceImpl productPromotionService;

    @GetMapping("/get-all")
    public ObjectRespone getAll() {
        return new ObjectRespone(productPromotionService.getAll());
    }

    @GetMapping("/get-one/{id}")
    public ObjectRespone getOne(@PathVariable String id) {
        return new ObjectRespone(productPromotionService.getOne(id));
    }

    @PostMapping("/add")
    public ObjectRespone addProductPromotion(@RequestBody ProductPromotionRequest productPromotion) {
        return new ObjectRespone(productPromotionService.addProductPromotion(productPromotion));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateProductPromotion(@RequestBody ProductPromotionRequest productPromotionReques, @PathVariable String id) {
        return new ObjectRespone(productPromotionService.updateProductPromotion(productPromotionReques, id));
    }

    @GetMapping("/page")
    public ObjectRespone pageProductPromotion(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "2") Integer pageSize){
        return new ObjectRespone(productPromotionService.ProductPromotionPage(page,pageSize));
    }


}
