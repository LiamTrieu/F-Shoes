package com.fshoes.core.admin.voucher.controller;

import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.core.admin.voucher.service.AdCustomerVoucherService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageableRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customerVoucher")
@CrossOrigin("*")
public class AdCustomerVoucherController {
    @Autowired
    private AdCustomerVoucherService adCustomerVoucherService;

    @GetMapping("/view/all")
    public ObjectRespone getAllCustomerVoucher() {
        return new ObjectRespone(adCustomerVoucherService.getAllCustomerVoucher());
    }

    @GetMapping("/view/one/{id}")
    public ObjectRespone getCustomerVoucherOneById(@PathVariable Integer id) {
        return new ObjectRespone(adCustomerVoucherService.getCustomerVoucherById(id));
    }

    @GetMapping("/view/page")
    public ObjectRespone getPageCustomerVoucher(@ModelAttribute PageableRequest pageableRequest) {
        return new ObjectRespone(adCustomerVoucherService.getPageCustomerVoucher(pageableRequest));
    }

    @PostMapping("/add")
    public ObjectRespone addCustomerVoucher(@RequestBody @Valid AdCustomerVoucherRequest adCustomerVoucherRequest) {
        return new ObjectRespone(adCustomerVoucherService.addCustomerVoucher(adCustomerVoucherRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ObjectRespone deleteVoucher(@PathVariable Integer id) {
        return adCustomerVoucherService.deleteCustomerVoucher(id) ?
                new ObjectRespone("Hủy customer voucher thành công") :
                new ObjectRespone("Hủy customer voucher thất bại");
    }
}
