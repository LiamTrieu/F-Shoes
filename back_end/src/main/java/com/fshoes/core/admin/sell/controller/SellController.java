package com.fshoes.core.admin.sell.controller;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.admin.sell.service.GetProductService;
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
    public ObjectRespone getAllProduct(){
        return new ObjectRespone(getSell.getAllProduct());
    }

    @GetMapping("/getCustomer")
    public ObjectRespone getAllCustomer(AdCustomerRequest request){

        return new ObjectRespone(getSell.getAllCustomer(request));
    }



}
