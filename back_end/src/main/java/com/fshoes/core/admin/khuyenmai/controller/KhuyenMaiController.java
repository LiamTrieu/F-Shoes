package com.fshoes.core.admin.khuyenmai.controller;


import com.fshoes.core.admin.khuyenmai.service.KhuyenMaiService;
import com.fshoes.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/promotion")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(khuyenMaiService.getAll());
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<?> getOne(@PathVariable int id) {
        return ResponseEntity.ok(khuyenMaiService.getOne(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addKhuyenMai(@RequestBody Promotion promotion) {
        return ResponseEntity.ok(khuyenMaiService.addKhuyenMai(promotion));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateKhuyenMai(@RequestBody Promotion promotion, @PathVariable int id) {
        return ResponseEntity.ok(khuyenMaiService.updateKhuyenMai(promotion, id));
    }

    @GetMapping("/page")
    public ResponseEntity<?> pageKM(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "2") int pageSize){
        return ResponseEntity.ok(khuyenMaiService.KMPage(page,pageSize));
    }
}
