package com.fshoes.core.admin.khachhang.controller;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.core.admin.khachhang.service.impl.KhachHangServiceImpl;
import com.fshoes.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/khach-hang")
public class KhachHangController {
    @Autowired
    KhachHangServiceImpl khachHangService;


    @GetMapping("/get-all")
    public List<?> getAll(Model model) {
        return khachHangService.seriolizeList(khachHangService.getAll());
    }

    @GetMapping("/get-page")
    public List<?> getPage(@RequestParam(defaultValue = "0") int p, @RequestParam(defaultValue = "2") int pageSize) {
        return khachHangService.seriolizeList(khachHangService.getPage(p, pageSize).toList());
    }


    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Customer cu) {
        khachHangService.save(cu);
        return ResponseEntity.ok(new KhachHangRespone(cu));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Customer cu) {
        cu.setId(id);
        khachHangService.save(cu);
        return ResponseEntity.ok(new KhachHangRespone(cu));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        khachHangService.delete(id);
    }
}
