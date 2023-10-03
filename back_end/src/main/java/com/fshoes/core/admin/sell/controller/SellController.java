package com.fshoes.core.admin.sell.controller;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.CreateCartRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sell")
public class SellController {

    @Autowired
    private AdminSellService getSell;

    @GetMapping("/getProduct")
    public ObjectRespone getAllProduct(FilterProductDetailRequest request) {
        return new ObjectRespone(getSell.getAllProduct(request));
    }

    @GetMapping("/get-size")
    public ObjectRespone getAllSize() {
        return new ObjectRespone(getSell.getListSize());
    }
    @GetMapping("/get-color")
    public ObjectRespone getAllColor() {
        return new ObjectRespone(getSell.getListColor());
    }

    @GetMapping("/get-amount/{id}")
    public ObjectRespone getAmount(@PathVariable String id) {
        return new ObjectRespone(getSell.getAmount(id));
    }

    @GetMapping("/get-product-detail-cart/{id}")
    public ObjectRespone getAllProductDetailCart(@PathVariable String id) {
        return new ObjectRespone(getSell.getProductDetailCartSell(id));
    }


    @PostMapping("/create-cart")
    public ObjectRespone createBill() {
        return new ObjectRespone(getSell.createCart());
    }

    @DeleteMapping("/delete-cart/{id}")
    public ObjectRespone deleteBill(@PathVariable String id) {
        return new ObjectRespone(getSell.deleteCart(id));
    }

    @GetMapping("/get-product-cart")
    public ObjectRespone getAllProductCart() {
        return new ObjectRespone(getSell.getAllProductCart());
    }

    @GetMapping("/getCustomer")
    public ObjectRespone getAllCustomer(AdCustomerRequest request) {

        return new ObjectRespone(getSell.getAllCustomer(request));
    }

    @GetMapping("/get-cart")
    public ObjectRespone getAllCart() {
        return new ObjectRespone(getSell.getAllCart());
    }

    @GetMapping("/get-cart-detail/{idCart}")
    public ObjectRespone getCartDetail(@PathVariable String idCart) {
        return new ObjectRespone(getSell.getCartDetail());
    }

    @PostMapping("/add-product-sell")
    public ObjectRespone addProductSell(@RequestBody CreateCartRequest request) {
        return new ObjectRespone(getSell.addCartDetail(request));
    }


}
