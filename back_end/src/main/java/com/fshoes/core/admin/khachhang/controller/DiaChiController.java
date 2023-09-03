package com.fshoes.core.admin.khachhang.controller;


import com.fshoes.core.admin.khachhang.model.respone.DiaChiRespone;
import com.fshoes.core.admin.khachhang.service.DiaChiService;
import com.fshoes.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/dia-chi")
@CrossOrigin("*")
public class DiaChiController {
    @Autowired
    private DiaChiService diaChiService;

    @GetMapping("/get-all")
    public List<?> getAll() {
        return diaChiService.seriolizeList(diaChiService.getAll());
    }

    @GetMapping("/get-page")
    public List<?> getPage(@RequestParam(defaultValue = "0") int p) {
        return diaChiService.seriolizeList(diaChiService.getPage(p).toList());
    }


    @PostMapping("/create")
    public ResponseEntity<?> add(@RequestBody Address address) {
        diaChiService.save(address);
        return ResponseEntity.ok(new DiaChiRespone(address));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Address address) {
        address.setId(id);
        diaChiService.save(address);
        return ResponseEntity.ok(new DiaChiRespone(address));
    }
}
