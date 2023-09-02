package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.service.HDBillHistoryService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/billHistory")
@CrossOrigin("*")
public class HDBillHistoryController {

    @Autowired
    private HDBillHistoryService hdBillHistoryService;

    @GetMapping("/get-by-idBIll/{idBill}")
    public ObjectRespone getByIdBill(@PathVariable("idBill") Integer idBill) {
        return new ObjectRespone(hdBillHistoryService.getBillHistoriesByBillId(idBill));
    }

}
