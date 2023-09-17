package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.BillConfirmRequest;
import com.fshoes.core.admin.hoadon.model.request.BillFilterRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/bill")
public class HDBillController {

    @Autowired
    private HDBillService hdBillService;

    @GetMapping("/filter")
    public PageReponse getBillByStatusAndDateRange(
            @ModelAttribute BillFilterRequest billFilterRequest
    ) throws ParseException {
        return new PageReponse<>(hdBillService.filterBill(billFilterRequest));
    }

    @PostMapping("/create-bill")
    public ObjectRespone createBill() {
        return new ObjectRespone(hdBillService.createBill());
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateBill(@PathVariable("id") String idBill,
                                    @RequestBody HDBillRequest hdBillRequest) {
        return new ObjectRespone(hdBillService.updateBill(idBill, hdBillRequest));
    }

    @PutMapping("/cancel/{id}")
    public ObjectRespone cancel(@PathVariable("id") String idBill,
                                @RequestBody HDBillRequest hdBillRequest) {
        return new ObjectRespone(hdBillService.cancelOrder(idBill, hdBillRequest));
    }

    @PutMapping("/confirm-order/{idBill}")
    public ObjectRespone confirmOrder(@PathVariable(name = "idBill") String idBill,
                                      @RequestBody BillConfirmRequest billConfirmRequest) {
        return new ObjectRespone(hdBillService.confirmOrder(idBill, billConfirmRequest));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getOne(@PathVariable("id") String id) {
        return new ObjectRespone(hdBillService.getOne(id));
    }
}
