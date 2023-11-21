package com.fshoes.core.client.controller;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.model.request.ClientBillAccountRequest;
import com.fshoes.core.client.model.request.ClientBillDetailRequest;
import com.fshoes.core.client.model.request.ClientBillRequest;
import com.fshoes.core.client.model.request.ClientCancelBillRequest;
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
    public ObjectRespone getOneUser() {
        return new ObjectRespone(service.getOneCustomerClient(userLogin));
    }

    @GetMapping("/get-all")
    public List<ClientCustomerResponse> getAllAccount() {
        return service.getAll();
    }


    @GetMapping("/all-bill")
    public ObjectRespone getAllBill(ClientBillAccountRequest status) {
        return new ObjectRespone(service.getALlBill(status));
    }

    @GetMapping("/all-bill-table")
    public ObjectRespone getAllBillTable(ClientBillAccountRequest status) {
        return new ObjectRespone(service.getALlBillTable(status));
    }
    @GetMapping("/all-bill-return")
    public ObjectRespone getAllBillReturn() {
        return new ObjectRespone(service.getALlBillReturn());
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

    @GetMapping("/get-client-billResponse/{id}")
    public ObjectRespone getClientBillResponse(@PathVariable("id") String id) {
        return new ObjectRespone(service.getClientBillResponse(id));
    }

    @PutMapping("/update-inf-bill/{id}")
    public ObjectRespone updateInfBill(@PathVariable("id") String idBill,
                                       @RequestBody ClientBillRequest clientBillRequest) {
        return new ObjectRespone(service.updateBill(idBill, clientBillRequest));
    }

    @PostMapping("/save-billDetail")
    public ObjectRespone save(@RequestBody ClientBillDetailRequest clientBillDetailRequest) {
        return new ObjectRespone(service.saveBillDetail(clientBillDetailRequest));
    }

    @DeleteMapping("/delete-billDetail/{id}")
    public ObjectRespone deleteBillDetail(@PathVariable("id") String idBillDetail) {
        return new ObjectRespone(service.delete(idBillDetail));
    }

    @PutMapping("/cancel-bill/{id}")
    public ObjectRespone cancelBill(@PathVariable("id") String idBill,
                                    @RequestBody ClientCancelBillRequest clientCancelBillRequest) {
        return new ObjectRespone(service.cancelBill(idBill, clientCancelBillRequest));
    }

    @GetMapping("/get-billDetail-by-idBill-and-status/{idBill}")
    public ObjectRespone getBillDetailByBillIdAndStatus(
            @PathVariable("idBill") String idBill,
            @RequestParam("status") Integer status
    ) {
        return new ObjectRespone(service.getBillDetailsByBillIdAndStatus(idBill, status));
    }


}
