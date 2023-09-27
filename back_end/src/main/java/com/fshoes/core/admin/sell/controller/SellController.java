package com.fshoes.core.admin.sell.controller;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sell")
public class SellController {

    @Autowired
    private AdminSellService getSell;

    @GetMapping("/getProduct")
    public ObjectRespone getAllProduct(FilterProductDetailRequest request){
        return new ObjectRespone(getSell.getAllProduct(request));
    }

    @GetMapping("/get-product-cart")
    public ObjectRespone getAllProductCart( ){
        return new ObjectRespone(getSell.getAllProductCart());
    }

    @GetMapping("/getCustomer")
    public ObjectRespone getAllCustomer(AdCustomerRequest request){

        return new ObjectRespone(getSell.getAllCustomer(request));
    }



}
