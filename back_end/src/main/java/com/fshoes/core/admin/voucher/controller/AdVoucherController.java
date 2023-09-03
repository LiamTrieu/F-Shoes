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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ObjectRespone getOneById(@PathVariable Integer id) {
        return new ObjectRespone(voucherService.getVoucherById(id));
    }

    @GetMapping("/view/page")
    public ObjectRespone getPageVoucher(@RequestParam(defaultValue = "0", name = "page") Integer page) {
        return new ObjectRespone(voucherService.getPageVoucher(page));
    }

    @PostMapping("/add")
    public ObjectRespone addVoucher(@RequestBody @Valid AdVoucherRequest voucherRequest) {
        return new ObjectRespone(voucherService.addVoucher(voucherRequest));
    }

    @PatchMapping("/update/{id}")
    public ObjectRespone updateVoucher(@PathVariable Integer id, @RequestBody @Valid AdVoucherRequest voucherRequest) {
        return new ObjectRespone(voucherService.updateVoucher(id, voucherRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ObjectRespone deleteVoucher(@PathVariable Integer id) {
        return voucherService.deleteVoucher(id) ?
                new ObjectRespone("Hủy voucher thành công") :
                new ObjectRespone("Hủy voucher thất bại");
    }

    @GetMapping("/searchByName")
    public ObjectRespone getSearchVoucherByName(@RequestParam(defaultValue = "0", name = "page") Integer page,
                                                @ModelAttribute AdVoucherSearch adVoucherSearch) {
        return new ObjectRespone(voucherService.getSearchVoucher(page, adVoucherSearch));
    }

}
