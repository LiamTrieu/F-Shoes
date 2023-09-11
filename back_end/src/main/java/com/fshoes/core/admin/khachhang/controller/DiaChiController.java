package com.fshoes.core.admin.khachhang.controller;


import com.fshoes.core.admin.khachhang.model.request.DiaChiRequest;
import com.fshoes.core.admin.khachhang.model.respone.DiaChiRespone;
import com.fshoes.core.admin.khachhang.service.DiaChiService;
import com.fshoes.core.common.ObjectRespone;
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
        return  diaChiService.getAll();
    }

    @GetMapping("/get-page")
    public List<?> getPage(@RequestParam(defaultValue = "0") int p) {
        return diaChiService.getPage(p).toList();
    }

    @GetMapping("/get-one/{id}")
    public ObjectRespone getOne(@PathVariable int id){
        return new ObjectRespone(diaChiService.getOne(id));
    }


    @PostMapping("/create")
    public ObjectRespone add(@RequestBody DiaChiRequest diaChiRequest) {
        return new ObjectRespone(diaChiService.add(diaChiRequest));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone update(@PathVariable Integer id, @RequestBody DiaChiRequest diaChiRequest) {
        return new ObjectRespone(diaChiService.update(id,diaChiRequest));
    }
}
