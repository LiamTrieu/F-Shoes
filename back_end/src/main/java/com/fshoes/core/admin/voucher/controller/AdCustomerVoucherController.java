package com.fshoes.core.admin.voucher.controller;

import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.core.admin.voucher.service.AdCustomerVoucherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customerVoucher")
public class AdCustomerVoucherController {
    @Autowired
    private AdCustomerVoucherService adCustomerVoucherService;

    @GetMapping("/view/all")
    public ResponseEntity<?> getAllCustomerVoucher() {
        return ResponseEntity.ok(adCustomerVoucherService.getAllCustomerVoucher());
    }

    @GetMapping("/view/one/{id}")
    public ResponseEntity<?> getCustomerVoucherOneById(@PathVariable Integer id) {
        return ResponseEntity.ok(adCustomerVoucherService.getCustomerVoucherById(id));
    }

    @GetMapping("/view/page")
    public ResponseEntity<?> getPageCustomerVoucher(@RequestParam(defaultValue = "0", name = "page") Integer page) {
        return ResponseEntity.ok(adCustomerVoucherService.getPageCustomerVoucher(page));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCustomerVoucher(@RequestBody @Valid AdCustomerVoucherRequest adCustomerVoucherRequest) {
        return ResponseEntity.ok(adCustomerVoucherService.addCustomerVoucher(adCustomerVoucherRequest));
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateCustomerVoucher(@PathVariable Integer id, @RequestBody @Valid AdCustomerVoucherRequest adCustomerVoucherRequest) {
        return ResponseEntity.ok(adCustomerVoucherService.updateCustomerVoucher(id, adCustomerVoucherRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteVoucher(@PathVariable Integer id) {
        return adCustomerVoucherService.deleteCustomerVoucher(id) ?
                ResponseEntity.ok("Hủy customer voucher thành công") :
                ResponseEntity.ok("Hủy customer voucher thất bại");
    }
}
