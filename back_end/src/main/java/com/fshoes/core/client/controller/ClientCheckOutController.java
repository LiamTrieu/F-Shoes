package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.core.client.service.ClientCheckoutService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/client/checkout")
public class ClientCheckOutController {

    @Autowired
    private ClientCheckoutService service;

    @PostMapping
    public ObjectRespone checkout(@RequestBody ClientCheckoutRequest request){
        return new ObjectRespone(service.thanhToan(request));
    }
}
