package com.fshoes.core.admin.voucher.controller;

import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.service.AdVoucherService;
import com.fshoes.core.common.ObjectRespone;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/voucher")
public class AdVoucherController {

    @Autowired
    private AdVoucherService voucherService;

    @GetMapping("/view/all")
    public ObjectRespone getAllVoucher() {
        return new ObjectRespone(voucherService.getAllVoucher());
    }

    @GetMapping("/view/one/{id}")
    public ObjectRespone getOneVoucherById(@PathVariable String id) {
        return new ObjectRespone(voucherService.getVoucherById(id));
    }

    @GetMapping("/view/page")
    public ObjectRespone getPageVoucher(@RequestParam(name = "numberPage") Integer page) {
        return new ObjectRespone(voucherService.getPageVoucher(page));
    }

    @PostMapping("/add")
    public ObjectRespone addVoucher(@RequestBody @Valid AdVoucherRequest voucherRequest) {
        return new ObjectRespone(voucherService.addVoucher(voucherRequest));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateVoucher(@PathVariable String id, @RequestBody @Valid AdVoucherRequest voucherRequest) throws ParseException {
        return new ObjectRespone(voucherService.updateVoucher(id, voucherRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ObjectRespone deleteVoucher(@PathVariable String id) {
        return voucherService.deleteVoucher(id) ?
                new ObjectRespone("Hủy voucher thành công") :
                new ObjectRespone("Hủy voucher thất bại");
    }

    @GetMapping("/search")
    public ObjectRespone getSearchVoucher(
            @ModelAttribute AdVoucherSearch adVoucherSearch) {
        return new ObjectRespone(voucherService.getSearchVoucher(adVoucherSearch));
    }

}
