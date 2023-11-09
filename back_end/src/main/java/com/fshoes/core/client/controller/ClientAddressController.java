package com.fshoes.core.client.controller;

import com.fshoes.core.client.service.ClientAddressService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client/address")
public class ClientAddressController {
    @Autowired
    private ClientAddressService service;

    @Autowired
    private UserLogin userLogin;

    @GetMapping("/get-all")
    public ObjectRespone getPageAddressByIdCustomer(@RequestParam(defaultValue = "0") int p){
        return new ObjectRespone(service.getPageAddressByIdCustomer(p,userLogin));
    }

    @GetMapping("/get-default")
    public ObjectRespone getAddressDefault() {
        return new ObjectRespone(service.getAddressDefault(userLogin));
    }
}
