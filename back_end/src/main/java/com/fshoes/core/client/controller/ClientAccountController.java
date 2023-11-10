package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.service.ClientAccountService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/client/customer")
public class ClientAccountController {
    @Autowired
    private ClientAccountService service;

    @Autowired
    private UserLogin userLogin;

    @PutMapping("/update")
    public ObjectRespone UpdateUser(@ModelAttribute ClientAccountRequest request) throws ParseException {
        return new ObjectRespone(service.update(userLogin, request));
    }

    @GetMapping("/get-one")
    public ObjectRespone getOneUser(){
        return new ObjectRespone(service.getOneCustomerClient(userLogin));
    }
}
