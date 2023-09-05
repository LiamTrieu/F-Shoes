package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.ProductRequest;
import com.fshoes.core.admin.sanpham.service.ProductService;
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
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/page")
    public PageReponse getPageProduct(PageableRequest pageableRequest,
                                       @RequestParam(defaultValue = "") String textSearch) {
        return new PageReponse<>(productService.getPage(pageableRequest, textSearch));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getProduct(@PathVariable int id){
        return new ObjectRespone(productService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addProduct(@RequestBody ProductRequest productReq){
        return new ObjectRespone(productService.addProduct(productReq));
    }
    @PutMapping ("/update/{id}")
    public ObjectRespone updateProduct(@RequestBody ProductRequest productReq,
                                        @PathVariable int id){
        return new ObjectRespone(productService.updateProduct(productReq, id));
    }

    @PutMapping("/deleted/{id}")
    public ObjectRespone deletedProduct(@RequestBody boolean isDeleted,
                                        @PathVariable int id) {
        return new ObjectRespone(productService.chageDeleted(id,isDeleted));
    }
}
