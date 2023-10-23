package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.service.ClientProductService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
public class ClientProductController {

    @Autowired
    private ClientProductService clientProductService;

    @GetMapping("/product")
    public ObjectRespone getProduct(String id) {
        return new ObjectRespone((clientProductService.getProducts(id)));
    }

    @GetMapping("/product/size")
    public ObjectRespone getProductBySize(ClientProductDetailRequest request) {
        return new ObjectRespone(clientProductService.getProductBySize(request));
    }

}
