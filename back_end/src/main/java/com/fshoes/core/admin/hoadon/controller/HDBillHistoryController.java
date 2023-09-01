package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.service.HDBillHistoryService;
import com.fshoes.entity.Bill_History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/billHistory")
@CrossOrigin("*")
public class HDBillHistoryController {

    @Autowired
    private HDBillHistoryService hdBillHistoryService;

    @GetMapping("/get-by-idBIll/{idBill}")
    public List<Bill_History> getByIdBill(@PathVariable("idBill") Integer idBill) {
        return hdBillHistoryService.getBill_HistoriesByBill_Id(idBill);
    }

}
