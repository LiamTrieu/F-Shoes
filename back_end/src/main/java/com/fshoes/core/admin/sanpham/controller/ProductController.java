package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.service.ProductService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @GetMapping
    public ObjectRespone getAllProducts(ProductFilterRequest filter) {
        return new ObjectRespone(new PageReponse<>(productService.getProduct(filter)));
    }

    @GetMapping("/get-list")
    public ObjectRespone getListProduct(){
        return new ObjectRespone(productService.listProducts());
    }

    @GetMapping("/get-list-image/{idColor}")
    public ObjectRespone getListImage(@PathVariable String idColor) {
        return new ObjectRespone(productService.getListImage(idColor));
    }
    @DeleteMapping("/delete/{id}")
    public ObjectRespone delete(@PathVariable String id) {
        return new ObjectRespone(productService.changeProduct(id));
    }
    @DeleteMapping("/change-status/{id}")
    public ObjectRespone ChangeStatus(@PathVariable String id) {
        return new ObjectRespone(productService.changeStatusProduct(id));
    }

    @PostMapping("/upload-image/{idColor}")
    public ObjectRespone updateImage(@PathVariable String idColor,
                                     @ModelAttribute List<MultipartFile> listImage){
        return new ObjectRespone(productService.uploadListImage(idColor, listImage));
    }

    @PostMapping("/add")
    public void addProductDetail(@RequestBody List<ProductDetailRequest>  request){
        productService.addProductDetail(request);
    }
    @PostMapping("/update/{id}")
    public void addProductDetail(@PathVariable String id, @RequestBody ProductDetailRequest request){
        productService.updateProductDetail(id,request);
    }

    @GetMapping("/product-detail")
    public ObjectRespone productDetail(PrdDetailFilterRequest request) {
        return new ObjectRespone(productService.getProductDetail(request));
    }

    @GetMapping("/name-by-id/{id}")
    public ObjectRespone nameById(@PathVariable String id) {
        return new ObjectRespone(productService.getMaxPriceProductId(id));
    }

    @GetMapping("/product-detail/{id}")
    public ObjectRespone getProductDetail(@PathVariable String id) {
        return new ObjectRespone(productService.details(id));
    }

    @GetMapping("/image-product/{id}")
    public ObjectRespone getImageProduct(@PathVariable String id) {
        return new ObjectRespone(productService.getImageProduct(id));
    }
}
