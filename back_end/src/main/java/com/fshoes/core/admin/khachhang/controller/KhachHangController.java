package com.fshoes.core.admin.khachhang.controller;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.core.admin.khachhang.service.impl.KhachHangServiceImpl;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/khach-hang")
@CrossOrigin("*")
public class KhachHangController {
    @Autowired
    private KhachHangServiceImpl khachHangService;


    @GetMapping("/get-all")
    public List<?> getAll(Model model) {
        return khachHangService.seriolizeList(khachHangService.getAll());
    }

    @GetMapping("/get-page")
    public PageReponse getPage(@RequestParam(defaultValue = "0") int p, @RequestParam(defaultValue = "2") int pageSize) {
        return new PageReponse<>(khachHangService.getPage(p, pageSize));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Customer customer) {
        customer.setStatus(1);
        khachHangService.save(customer);
        return ResponseEntity.ok(new KhachHangRespone(customer));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Customer customer) {
        customer.setId(id);
        khachHangService.save(customer);
        return ResponseEntity.ok(new KhachHangRespone(customer));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        khachHangService.delete(id);
    }
}
