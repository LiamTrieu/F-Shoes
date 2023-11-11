package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.model.response.ClientCustomerResponse;
import com.fshoes.core.client.service.ClientAccountService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

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


    @GetMapping("all-bill")
    public ObjectRespone getAllBill( ClientBillAccountRequest status){
//        Account account = userLogin.getUserLogin();
//        if (account != null) {
//            String idCustomer = account.getId();
//            List<ClientBillAccountResponse> allBills = accountService.getALlBill(status);
//            List<ClientBillAccountResponse> filteredBills = allBills.stream()
//                    .filter(Bill -> Bill.getCustomer().equals(idCustomer))
//                    .collect(Collectors.toList());
//            return new ObjectRespone(filteredBills);
//        } else {
//            return new ObjectRespone("Không có người dùng đăng nhập hoặc không tìm thấy tài khoản.");
//        }

        return new ObjectRespone(accountService.getALlBill(status));

    }

    @GetMapping("/get-by-idBill/{idBill}")
    public ObjectRespone getByIdBill(@PathVariable("idBill") String idBill) {
        return new ObjectRespone(accountService.getBillDetailsByBillId(idBill));
    }

    @GetMapping("/get-bill-history-by-idBill/{idBill}")
    public ObjectRespone getBillHistoryByIdBill(@PathVariable("idBill") String idBill) {
        return new ObjectRespone(accountService.getListBillHistoryByIdBill(idBill));
    }

    @GetMapping("/get-transaction-by-idBill/{idBill}")
    public ObjectRespone getTransactionByIdBill(@PathVariable("idBill") String idBill) {
        return new ObjectRespone(accountService.getListTransactionByIdBill(idBill));
    }
}
