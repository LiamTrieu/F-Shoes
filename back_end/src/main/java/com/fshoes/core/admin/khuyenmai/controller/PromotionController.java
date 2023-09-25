package com.fshoes.core.admin.khuyenmai.controller;


import com.fshoes.core.admin.khuyenmai.model.request.GetProductDetailByIdProduct;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionAddRequest;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionRequestAdd;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.admin.khuyenmai.service.ProductPromotionAddService;
import com.fshoes.core.admin.khuyenmai.service.impl.PromotionServiceImpl;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    @Autowired
    private PromotionServiceImpl khuyenMaiService;

    @Autowired
    private ProductPromotionAddService productPromotionAddService;
    @GetMapping("/get-product-detail")
    public ObjectRespone getAllProductDeatil(ProductPromotionSearch red){
        return new ObjectRespone( productPromotionAddService.getAllProductDetail(red));
    }

    @GetMapping("/get-product-detail-by-product/{id}")
    public ObjectRespone getAllProductDeatilByProduct(GetProductDetailByIdProduct red,@PathVariable  String id){
        return new ObjectRespone( productPromotionAddService.getProductDetailByProduct(red,id));
    }
    @GetMapping("/get-product")
    public ObjectRespone getAllProduct(ProductPromotionSearch red){
        return new ObjectRespone( productPromotionAddService.getAll(red));
    }

    @GetMapping("/get-one/{id}")
    public ObjectRespone getOne(@PathVariable String id) {
        return new ObjectRespone(khuyenMaiService.getOne(id));
    }
    @Transactional
    @PutMapping("/update/{id}")
    public ObjectRespone updateKhuyenMai(@RequestBody ProductPromotionAddRequest promotionRequest, @PathVariable String id) throws ParseException {
        return new ObjectRespone(khuyenMaiService.updateKhuyenMai(promotionRequest, id));
    }
@Transactional
    @PutMapping("/delete/{id}")
    public ObjectRespone deleteKhuyenMai( @PathVariable String id){
        return new ObjectRespone(khuyenMaiService.deleteKhuyenMai(id));
    }

    @GetMapping("/get-Promotion-filter")
    public PageReponse<PromotionRespone> getAllPro(PromotionSearch filter){
        return new PageReponse<>(khuyenMaiService.getAllPromotion(filter));
    }
@Transactional
    @PostMapping("/add-product-promotion")
    public ObjectRespone addProductPromotion(@RequestBody ProductPromotionAddRequest request) throws ParseException {
        return new ObjectRespone(khuyenMaiService.addKhuyenMaiOnProduct(request));
    }


}
