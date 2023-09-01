package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.service.ProductDetailService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/productDetail")
@CrossOrigin("*")
public class ProductDetailController {

    @Autowired
    private ProductDetailService productDetailService;

    @GetMapping("/page")
    public PageReponse getPageProductDetail(@ModelAttribute PageableRequest pageableRequest,
                                            @ModelAttribute PrdDetailFilterRequest filterReq) {
        return new PageReponse<>(productDetailService.getPage(pageableRequest, filterReq));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getProductDetail(@PathVariable int id){
        return new ObjectRespone(productDetailService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addProductDetail(@ModelAttribute ProductDetailRequest productDetailReq,
                                          @RequestParam MultipartFile imageFile){
        productDetailReq.setImage(imageFile);
        return new ObjectRespone(productDetailService.addProductDetail(productDetailReq));
    }
    @PutMapping ("/update/{id}")
    public ObjectRespone updateProductDetail(@RequestBody ProductDetailRequest productDetailReq,
                                        @PathVariable int id){
        return new ObjectRespone(productDetailService.updateProductDetail(productDetailReq, id));
    }
}
