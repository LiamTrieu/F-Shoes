package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientVoucherRequest;
import com.fshoes.core.client.service.ClientVoucherService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client/voucher")
public class ClientVoucherController {

    @Autowired
    private ClientVoucherService clientVoucherService;

    @Autowired
    private UserLogin userLogin;

    //voucher ban hang
    @GetMapping("/view/voucher-by-customer")
    public ObjectRespone getAllVoucherByIdCustomer(@ModelAttribute ClientVoucherRequest request) {
        return new ObjectRespone(clientVoucherService.getAllVoucherByIdCustomer(request, userLogin));
    }

    @GetMapping("/view/voucher-by-code/{code}")
    public ObjectRespone getVoucherByCode(@PathVariable String code) {
        return new ObjectRespone(clientVoucherService.getVoucherByCode(code));
    }

    //voucher my profile
    @GetMapping("/view/voucher-profile-public-oldest")
    public ObjectRespone getVoucherPublicMyProfileOldest() {
        return new ObjectRespone(clientVoucherService.getVoucherPublicMyProfileOldest());
    }

    @GetMapping("/view/voucher-profile-public-latest")
    public ObjectRespone getVoucherPublicMyProfileLatest() {
        return new ObjectRespone(clientVoucherService.getVoucherPublicMyProfileLatest());
    }

    @GetMapping("/view/voucher-profile-private-oldest")
    public ObjectRespone getVoucherPrivateMyProfileOldest() {
        return new ObjectRespone(clientVoucherService.getVoucherPrivateMyProfileOldest(userLogin));
    }

    @GetMapping("/view/voucher-profile-private-latest")
    public ObjectRespone getVoucherPrivateMyProfileLatest() {
        return new ObjectRespone(clientVoucherService.getVoucherPrivateMyProfileLatest(userLogin));
    }
}
