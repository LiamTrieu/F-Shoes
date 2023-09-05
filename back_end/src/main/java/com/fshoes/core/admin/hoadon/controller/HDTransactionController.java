package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.service.HDTransactionService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin("*")
public class HDTransactionController {

    @Autowired
    private HDTransactionService hdTransactionService;

    @GetMapping("/get-by-idBill/{idBill}")
    public ObjectRespone getTransactionByIdBill(@PathVariable("idBill") Integer idBill) {
        return new ObjectRespone(hdTransactionService.getTransactionByBillId(idBill));
    }

}
