package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.service.ProductDetailService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/product-detail")
public class ProductDetailController {

    @Autowired
    private ProductDetailService productDetailService;

    @GetMapping("/page/{id}")
    public PageReponse getPageProductDetail(@ModelAttribute PrdDetailFilterRequest filterReq,
                                            @PathVariable String id) {
        return new PageReponse<>(productDetailService.getPage(id, filterReq));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getProductDetail(@PathVariable String id) {
        return new ObjectRespone(productDetailService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addProductDetail(@ModelAttribute ProductDetailRequest productDetailReq) {
        return new ObjectRespone(productDetailService.addProductDetail(productDetailReq));
    }
    @PutMapping ("/update/{id}")
    public ObjectRespone updateProductDetail(@ModelAttribute ProductDetailRequest productDetailReq,
                                             @RequestParam List<MultipartFile> imageFiles,
                                             @PathVariable String id) {
        productDetailReq.setImages(imageFiles);
        return new ObjectRespone(productDetailService.updateProductDetail(productDetailReq, id));
    }
}
