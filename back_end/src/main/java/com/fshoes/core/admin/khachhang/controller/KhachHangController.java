package com.fshoes.core.admin.khachhang.controller;

import com.fshoes.core.admin.khachhang.model.request.AdKhachHangSearch;
import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.admin.khachhang.service.impl.KhachHangServiceImpl;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/khach-hang")
public class KhachHangController {
    @Autowired
    private KhachHangServiceImpl khachHangService;

    @GetMapping("/search")
    public ObjectRespone search(@ModelAttribute AdKhachHangSearch adKhachHangSearch) {
        return new ObjectRespone(khachHangService.findKhachHang(adKhachHangSearch));
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
