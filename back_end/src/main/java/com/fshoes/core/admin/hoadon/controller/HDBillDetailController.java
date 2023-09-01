package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.entity.Bill_Detail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/billDetail")
@CrossOrigin("*")
public class HDBillDetailController {

    @Autowired
    private HDBillDetailService hdBillDetailService;

    @GetMapping("/get-by-idBill/{idBill}")
    public List<Bill_Detail> getByIdBill(@PathVariable("idBill") Integer idBill) {
        return hdBillDetailService.getBill_DetailByBill_Id(idBill);
    }

    @PostMapping("/save")
    public Bill_Detail save(@RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return hdBillDetailService.save(hdBillDetailRequest);
    }

    @PutMapping("/update/{id}")
    public Bill_Detail updateBilldetail(@PathVariable("id") Integer id,
                                        @RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return hdBillDetailService.updateBillDetail(id, hdBillDetailRequest);
    }

    @GetMapping("/get-by-idBill-and-status/{idBill}")
    public List<Bill_Detail> getBill_DetailByBill_IdAndStatus(
            @PathVariable("idBill") Integer idBill,
            @RequestParam("status") Integer status
    ) {
        return hdBillDetailService.getBill_DetailByBill_IdAndStatus(idBill, status);
    }

}
