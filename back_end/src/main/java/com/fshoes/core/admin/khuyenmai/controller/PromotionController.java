package com.fshoes.core.admin.khuyenmai.controller;


import com.fshoes.core.admin.khuyenmai.model.request.AddProductRequest;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionAddRequest;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionRequestAdd;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.admin.khuyenmai.service.ProductPromotionAddService;
import com.fshoes.core.admin.khuyenmai.service.impl.PromotionServiceImpl;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    @Autowired
    private PromotionServiceImpl khuyenMaiService;

    @Autowired
    private ProductPromotionAddService productPromotionAddService;
    @GetMapping("/get-product")
    public ObjectRespone getAllProduct(){
        return new ObjectRespone( productPromotionAddService.getAll());
    }

    @GetMapping("/get-one/{id}")
    public ObjectRespone getOne(@PathVariable String id) {
        return new ObjectRespone(khuyenMaiService.getOne(id));
    }

    @PostMapping("/add")
    public ObjectRespone addKhuyenMai(@RequestBody PromotionRequestAdd promotionRequest) throws ParseException {
        return new ObjectRespone(khuyenMaiService.addKhuyenMai(promotionRequest));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateKhuyenMai(@RequestBody PromotionRequestAdd promotionRequest, @PathVariable String id) throws ParseException {
        return new ObjectRespone(khuyenMaiService.updateKhuyenMai(promotionRequest, id));
    }

    @PutMapping("/delete/{id}")
    public ObjectRespone deleteKhuyenMai( @PathVariable String id){
        return new ObjectRespone(khuyenMaiService.deleteKhuyenMai(id));
    }

    @GetMapping("/get-Promotion-filter")
    public PageReponse<PromotionRespone> getAllPro(PromotionSearch filter){
        return new PageReponse<>(khuyenMaiService.getAllPromotion(filter));
    }

    @PostMapping("/add-product-promotion")
    public ObjectRespone addProductPromotion(ProductPromotionAddRequest request) throws ParseException {
        return new ObjectRespone(khuyenMaiService.addKhuyenMaiOnProduct(request));
    }


}
