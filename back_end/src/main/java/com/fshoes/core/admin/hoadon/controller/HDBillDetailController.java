package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/billDetail")
public class HDBillDetailController {

    @Autowired
    private HDBillDetailService hdBillDetailService;

    @GetMapping("/get-by-idBill/{idBill}")
    public ObjectRespone getByIdBill(@PathVariable("idBill") String idBill) {
        return new ObjectRespone(hdBillDetailService.getBillDetailByBillId(idBill));
    }

    @PostMapping("/save")
    public ObjectRespone save(@RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return new ObjectRespone(hdBillDetailService.save(hdBillDetailRequest));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateBilldetail(@PathVariable("id") String id,
                                          @RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return new ObjectRespone(hdBillDetailService.updateBillDetail(id, hdBillDetailRequest));
    }

    @GetMapping("/get-by-idBill-and-status/{idBill}")
    public ObjectRespone getBillDetailByBillIdAndStatus(
            @PathVariable("idBill") String idBill,
            @RequestParam("status") Integer status
    ) {
        return new ObjectRespone(hdBillDetailService.getBillDetailByBillIdAndStatus(idBill, status));
    }

    @GetMapping("/get-by-billAndProductDetail")
    public ObjectRespone getByBillAndProductDetail(@RequestParam(name = "idBill") String idBill,
                                                   @RequestParam(name = "idProductDetail") String idProductDetail) {
        return new ObjectRespone(hdBillDetailService.getBillDetailByBillIdAndProductDetailId(idBill, idProductDetail));
    }

    @PutMapping("/decrementQuantity/{idBillDetail}")
    public ObjectRespone decrementQuantity(@PathVariable("idBillDetail") String idBillDetail) {
        return new ObjectRespone(hdBillDetailService.decrementQuantity(idBillDetail));
    }

    @PutMapping("/incrementQuantity/{idBillDetail}")
    public ObjectRespone incrementQuantity(@PathVariable("idBillDetail") String idBillDetail) {
        return new ObjectRespone(hdBillDetailService.incrementQuantity(idBillDetail));
    }

    @PutMapping("/changeQuantity/{idBillDetail}")
    public ObjectRespone changeQuantity(@PathVariable("idBillDetail") String idBillDetail, @RequestBody Integer quantity) {
        return new ObjectRespone(hdBillDetailService.changeQuantity(idBillDetail, quantity));
    }

    @PutMapping("/delete")
    public Boolean delete(@RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return hdBillDetailService.delete(hdBillDetailRequest);
    }

}
