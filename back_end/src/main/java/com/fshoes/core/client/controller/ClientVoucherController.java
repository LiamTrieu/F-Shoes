package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientVoucherRequest;
import com.fshoes.core.client.service.ClientVoucherService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client/voucher")
public class ClientVoucherController {

    @Autowired
    private ClientVoucherService clientVoucherService;

    @GetMapping("/view/voucher-by-customer")
    public ObjectRespone getAllVoucherByIdCustomer(@ModelAttribute ClientVoucherRequest request) {
        return new ObjectRespone(clientVoucherService.getAllVoucherByIdCustomer(request));
    }
}
