package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.core.common.ObjectRespone;
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

@RestController
@RequestMapping("/api/billDetail")
@CrossOrigin("*")
public class HDBillDetailController {

    @Autowired
    private HDBillDetailService hdBillDetailService;

    @GetMapping("/get-by-idBill/{idBill}")
    public ObjectRespone getByIdBill(@PathVariable("idBill") Integer idBill) {
        return new ObjectRespone(hdBillDetailService.getBillDetailByBillId(idBill));
    }

    @PostMapping("/save")
    public ObjectRespone save(@RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return new ObjectRespone(hdBillDetailService.save(hdBillDetailRequest));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateBilldetail(@PathVariable("id") Integer id,
                                          @RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return new ObjectRespone(hdBillDetailService.updateBillDetail(id, hdBillDetailRequest));
    }

    @GetMapping("/get-by-idBill-and-status/{idBill}")
    public ObjectRespone getBillDetailByBillIdAndStatus(
            @PathVariable("idBill") Integer idBill,
            @RequestParam("status") Integer status
    ) {
        return new ObjectRespone(hdBillDetailService.getBillDetailByBillIdAndStatus(idBill, status));
    }

}
