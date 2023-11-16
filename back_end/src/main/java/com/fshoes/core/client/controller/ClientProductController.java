package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientProductCungLoaiRequest;
import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.model.request.ClientProductRequest;
import com.fshoes.core.client.service.ClientProductService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
public class ClientProductController {

    @Autowired
    private ClientProductService clientProductService;

    @PostMapping("/product")
    public ObjectRespone getProduct(@RequestBody ClientProductRequest request) {
        return new ObjectRespone((clientProductService.getProducts(request)));
    }

    @GetMapping("/product/cung-loai")
    public ObjectRespone getProductCungLoai(ClientProductCungLoaiRequest request) {
        return new ObjectRespone((clientProductService.getProductCungLoai(request)));
    }

    @GetMapping("/product-home")
    public ObjectRespone getProductHome(ClientProductRequest request) {
        return new ObjectRespone((clientProductService.getProductsHome(request)));
    }

    @GetMapping("/selling-product")
    public ObjectRespone getSellingProduct(ClientProductRequest request) {
        return new ObjectRespone((clientProductService.getSellingProduct(request)));
    }

    @GetMapping("/product/size")
    public ObjectRespone getProductBySize(ClientProductDetailRequest request) {
        return new ObjectRespone(clientProductService.getProductBySize(request));
    }

    @GetMapping("/brand")
    public ObjectRespone getBrand() {
        return new ObjectRespone(clientProductService.getAllBrand());
    }

    @GetMapping("/category")
    public ObjectRespone getcategory() {
        return new ObjectRespone(clientProductService.getAllCategory());
    }

    @GetMapping("/material")
    public ObjectRespone getMaterial() {
        return new ObjectRespone(clientProductService.getAllMaterial());
    }

    @GetMapping("/sole")
    public ObjectRespone getSole() {
        return new ObjectRespone(clientProductService.getAllSole());
    }

    @GetMapping("/size")
    public ObjectRespone getSize() {
        return new ObjectRespone(clientProductService.getAllSize());
    }

    @GetMapping("/color")
    public ObjectRespone getColor() {
        return new ObjectRespone(clientProductService.getAllColor());
    }

    @GetMapping("/min-max-price")
    public ObjectRespone getMinMaxPrice() {
        return new ObjectRespone(clientProductService.getMinMaxPriceProductClient());
    }
}
