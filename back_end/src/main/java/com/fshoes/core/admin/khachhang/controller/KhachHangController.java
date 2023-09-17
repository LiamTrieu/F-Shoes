package com.fshoes.core.admin.khachhang.controller;

import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.admin.khachhang.service.impl.KhachHangServiceImpl;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/khach-hang")
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
    public ObjectRespone create(@RequestBody KhachHangRequest khachHangRequest) {
        khachHangRequest.setStatus(0);
        return new ObjectRespone(khachHangService.add(khachHangRequest));
    }

    @GetMapping("/get-one/{id}")
    public ObjectRespone getOne(@PathVariable String id) {
        return new ObjectRespone(khachHangService.getOne(id));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone update(@PathVariable String id, @RequestBody KhachHangRequest khachHangRequest) throws ParseException {
        return new ObjectRespone(khachHangService.update(id,khachHangRequest));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        khachHangService.delete(id);
    }
}
