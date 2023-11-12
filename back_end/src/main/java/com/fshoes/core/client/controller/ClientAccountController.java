package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.model.request.ClientBillAccountRequest;
import com.fshoes.core.client.model.response.ClientBillAccountResponse;
import com.fshoes.core.client.model.response.ClientCustomerResponse;
import com.fshoes.core.client.service.ClientAccountService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/get-all")
    public List<ClientCustomerResponse> getAllAccount(){
        return service.getAll();
    }


    @GetMapping("/all-bill")
    public ObjectRespone getAllBill( ClientBillAccountRequest status){
            return new ObjectRespone(service.getALlBill(status));
    }

    @GetMapping("/get-by-idBill/{idBill}")
    public ObjectRespone getByIdBill(@PathVariable("idBill") String idBill) {
        return new ObjectRespone(service.getBillDetailsByBillId(idBill));
    }

    @GetMapping("/get-bill-history-by-idBill/{idBill}")
    public ObjectRespone getBillHistoryByIdBill(@PathVariable("idBill") String idBill) {
        return new ObjectRespone(service.getListBillHistoryByIdBill(idBill));
    }

    @GetMapping("/get-transaction-by-idBill/{idBill}")
    public ObjectRespone getTransactionByIdBill(@PathVariable("idBill") String idBill) {
        return new ObjectRespone(service.getListTransactionByIdBill(idBill));
    }


    @GetMapping("/get-by-code/{code}")
    public ObjectRespone getByCode(@PathVariable("code") String code) {
        return new ObjectRespone(service.getBillDetailsByCode(code));
    }

    @GetMapping("/get-bill-history-by-code/{code}")
    public ObjectRespone getBillHistoryCode(@PathVariable("code") String code) {
        return new ObjectRespone(service.getListBillHistoryByCode(code));
    }


}
