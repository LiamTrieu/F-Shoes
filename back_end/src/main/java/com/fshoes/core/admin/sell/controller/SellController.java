package com.fshoes.core.admin.sell.controller;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.CreateCartRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sell")
//@CrossOrigin("*")
public class SellController {

    @Autowired
    private AdminSellService getSell;

    @GetMapping("/getProduct")
    public ObjectRespone getAllProduct(FilterProductDetailRequest request){
        return new ObjectRespone(getSell.getAllProduct(request));
    }

    @PostMapping("/create-cart")
    public ObjectRespone createBill(@RequestBody Cart cart){
        return new ObjectRespone(getSell.createCart(cart));
    }

    @GetMapping("/get-product-cart")
    public ObjectRespone getAllProductCart( ){
        return new ObjectRespone(getSell.getAllProductCart());
    }

    @GetMapping("/getCustomer")
    public ObjectRespone getAllCustomer(AdCustomerRequest request){

        return new ObjectRespone(getSell.getAllCustomer(request));
    }

    @GetMapping("/get-cart")
    public ObjectRespone getAllCart(){
        return new ObjectRespone(getSell.getAllCart());
    }

    @PostMapping("/add-product-sell")
    public ObjectRespone addProductSell(@RequestBody CreateCartRequest request){
        return new ObjectRespone(getSell.addCartDetail(request));
    }



}
