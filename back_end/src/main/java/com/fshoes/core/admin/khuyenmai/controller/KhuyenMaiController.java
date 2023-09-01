package com.fshoes.core.admin.khuyenmai.controller;


import com.fshoes.core.admin.khuyenmai.service.KhuyenMaiService;
import com.fshoes.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/khuyen-mai/")
public class KhuyenMaiController {

    @Autowired
    KhuyenMaiService khuyenMaiService;

    @GetMapping("/")
    public List<Promotion> getAll() {
        return khuyenMaiService.getAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<Promotion> getOne(@PathVariable int id) {
        return khuyenMaiService.getOne(id);
    }

    @PostMapping("/add")
    public Promotion addKhuyenMai(@RequestBody Promotion promotion) {
        return khuyenMaiService.addKhuyenMai(promotion);
    }

    @PutMapping("/update/{id}")
    public Promotion updateKhuyenMai(@RequestBody Promotion promotion, @PathVariable int id) {
        return khuyenMaiService.updateKhuyenMai(promotion, id);
    }

    @GetMapping("/page")
    public Page<Promotion> pageKM(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "2") int pageSize){
        return khuyenMaiService.KMPage(page,pageSize);
    }
}
