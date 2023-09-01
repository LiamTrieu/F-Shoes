package com.fshoes.core.admin.voucher.controller;

import com.fshoes.core.admin.voucher.model.request.VoucherRequest;
import com.fshoes.core.admin.voucher.service.VoucherServiceAdmin;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class VoucherController {
    @Autowired
    VoucherServiceAdmin voucherService;

    @GetMapping("view/all")
    public ResponseEntity<?> getAllVoucher() {
        return ResponseEntity.ok(voucherService.getAllVoucher());
    }

    @GetMapping("view/page")
    public ResponseEntity<?> getPageVoucher(@RequestParam(defaultValue = "0", name = "page") Integer page) {
        return ResponseEntity.ok(voucherService.getpageVoucher(page));
    }

    @PostMapping("add")
    public ResponseEntity<?> addVoucher(@RequestBody @Valid VoucherRequest voucherRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<ObjectError> objectErrorList = bindingResult.getAllErrors();
            return ResponseEntity.ok(objectErrorList);
        } else {
            return ResponseEntity.ok(voucherService.addVoucher(voucherRequest));
        }
    }

    @PatchMapping("update/{id}")
    public ResponseEntity<?> updateVoucher(@PathVariable Integer id, @RequestBody @Valid VoucherRequest voucherRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<ObjectError> objectErrorList = bindingResult.getAllErrors();
            return ResponseEntity.badRequest().body(objectErrorList);
        } else {
            boolean updateSuccess = voucherService.updateVoucher(id, voucherRequest);

            if (updateSuccess) {
                return ResponseEntity.ok("Cập nhật voucher thành công");
            } else {
                return ResponseEntity.ok("Cập nhật voucher thất bại");
            }
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteVoucher(@PathVariable Integer id) {
        if (voucherService.deleteVoucher(id)) {
            return ResponseEntity.ok("Hủy voucher thành công");
        } else {
            return ResponseEntity.ok("Hủy voucher thất bại");
        }
    }
}
