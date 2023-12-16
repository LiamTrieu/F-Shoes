package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.HDBillDetailRequest;
import com.fshoes.core.admin.hoadon.service.HDBillDetailService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/billDetail")
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

    @GetMapping("/get-by-billAndProductDetail")
    public ObjectRespone getByBillAndProductDetail(@RequestParam(name = "idBill") String idBill,
                                                   @RequestParam(name = "idPrd") String idPrd) {
        return new ObjectRespone(hdBillDetailService.getBillDtResByIdBillAndIDPrd(idBill, idPrd));
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

    @PutMapping("/return-product/{id}")
    public ObjectRespone returnProduct(@PathVariable("id") String id,
                                       @RequestBody HDBillDetailRequest hdBillDetailRequest) {
        return new ObjectRespone(hdBillDetailService.returnProduct(id, hdBillDetailRequest));
    }

    @GetMapping("/get-by-billAndProductDetailAndPrice")
    public ObjectRespone checkBillDetailByBillPrdAndPrice(@RequestParam(name = "idBill") String idBill,
                                                          @RequestParam(name = "idPrd") String idPrd, @RequestParam(name = "price") String price) {
        return new ObjectRespone(hdBillDetailService.getBillDtResByIdBillAndIDPrdAndPrice(idBill, idPrd, price));
    }

}
