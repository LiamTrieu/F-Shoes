package com.fshoes.core.admin.voucher.controller;

import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.service.AdVoucherService;
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
@RequestMapping("/api/voucher")
public class AdVoucherController {
    @Autowired
    private AdVoucherService voucherService;

    @GetMapping("/view/all")
    public ResponseEntity<?> getAllVoucher() {
        return ResponseEntity.ok(voucherService.getAllVoucher());
    }

    @GetMapping("/view/one/{id}")
    public ResponseEntity<?> getOneById(@PathVariable Integer id) {
        return ResponseEntity.ok(voucherService.getVoucherById(id));
    }

    @GetMapping("/view/page")
    public ResponseEntity<?> getPageVoucher(@RequestParam(defaultValue = "0", name = "page") Integer page) {
        return ResponseEntity.ok(voucherService.getPageVoucher(page));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addVoucher(@RequestBody @Valid AdVoucherRequest voucherRequest) {
        return ResponseEntity.ok(voucherService.addVoucher(voucherRequest));
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateVoucher(@PathVariable Integer id, @RequestBody @Valid AdVoucherRequest voucherRequest) {
        return ResponseEntity.ok(voucherService.updateVoucher(id, voucherRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteVoucher(@PathVariable Integer id) {
        return voucherService.deleteVoucher(id) ?
                ResponseEntity.ok("Hủy voucher thành công") :
                ResponseEntity.ok("Hủy voucher thất bại");
    }

    @GetMapping("/searchByName/{textSearch}")
    public ResponseEntity<?> getSearchVoucherByName(@RequestParam(defaultValue = "0", name = "page") Integer page,
                                                    @PathVariable String textSearch) {
        return ResponseEntity.ok(voucherService.getSearchVoucherByName(page, textSearch));
    }

    @GetMapping("/searchByDate")
    public ResponseEntity<?> getSearchVoucherByDate(@RequestParam(defaultValue = "0", name = "page") Integer page,
                                                    @RequestParam(defaultValue = "", name = "sdSearch") String sdSearch,
                                                    @RequestParam(defaultValue = "", name = "edSearch") String edSearch) {
        return ResponseEntity.ok(voucherService.getSearchVoucherByDate(page, sdSearch, edSearch));
    }
}
