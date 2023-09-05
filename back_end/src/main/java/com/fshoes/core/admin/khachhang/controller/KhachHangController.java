package com.fshoes.core.admin.khachhang.controller;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.core.admin.khachhang.service.impl.KhachHangServiceImpl;
import com.fshoes.core.common.ObjectRespone;
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
    public List<?> getAll() {
        return khachHangService.getAll();
    }

    @GetMapping("/get-page")
    public ObjectRespone getPage(@RequestParam(defaultValue = "0") int p) {
        return new ObjectRespone(khachHangService.getPage(p));
    }

    @GetMapping("/search")
    public ObjectRespone search(@RequestParam(defaultValue = "0") int p,
                                @RequestParam(defaultValue = "") String textSearch) {
        return new ObjectRespone(khachHangService.findKhachHangByName(p,textSearch));
    }
    @PostMapping("/create")
    public ObjectRespone create(@RequestBody Customer customer) {
        customer.setStatus(1);
        return new ObjectRespone(khachHangService.save(customer));
    }

    @GetMapping("/get-one/{id}")
    public ObjectRespone getOne(@PathVariable int id) {
        return new ObjectRespone(khachHangService.getOne(id));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone update(@PathVariable int id, @RequestBody Customer customer) {
        customer.setId(id);
        return new ObjectRespone(khachHangService.save(customer));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        khachHangService.delete(id);
    }
}
