package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.*;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/bill")
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

    @PutMapping("/update-status/{id}")
    public ObjectRespone updateStatus(@PathVariable("id") String id, @RequestBody HDBillRequest hdBillRequest) {
        return new ObjectRespone(hdBillService.updateStatusBill(id, hdBillRequest));
    }

    @PutMapping("/confirm-payment/{id}")
    public ObjectRespone confirmPayment(@PathVariable("id") String id, @RequestBody HDConfirmPaymentRequest hdConfirmPaymentRequest) {
        return new ObjectRespone(hdBillService.confirmPayment(id, hdConfirmPaymentRequest));
    }

    @PutMapping("/update-billDetail/{id}")
    public ObjectRespone updateBillDetail(@PathVariable("id") String id, @RequestBody List<HDBillDetailRequest> listHdBillDetailRequest) {
        return new ObjectRespone(hdBillService.updateBillDetailByBill(id, listHdBillDetailRequest));
    }

}
