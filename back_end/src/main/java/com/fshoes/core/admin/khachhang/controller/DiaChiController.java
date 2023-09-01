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
@RequestMapping("/dia-chi")
public class DiaChiController {
    @Autowired
    DiaChiService diaChiService;

    public List<DiaChiRespone> seriolizeList(List<Address> lst){
        List items = new ArrayList();
        for (Address ad : lst) items.add(new DiaChiRespone(ad));
        return items;
    }

    @GetMapping("/get-all")
    public List<?> getAll(){
        return seriolizeList(diaChiService.getAll());
    }

    @GetMapping("/get-page")
    public List<?> getPage(@RequestParam(defaultValue = "0") int p){
        return seriolizeList(diaChiService.getPage(p).toList());
    }


    @PostMapping("/create")
    public ResponseEntity<?> add(@RequestBody Address address){
       String error ="";
       if (!error.isEmpty()){
            return ResponseEntity.badRequest().body(error);
       }
       diaChiService.save(address);
      return ResponseEntity.ok(new DiaChiRespone(address));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Address address){
        String error ="";
        if (!error.isEmpty()){
            return ResponseEntity.badRequest().body(error);
        }
        address.setId(id);
        diaChiService.save(address);
        return ResponseEntity.ok(new DiaChiRespone(address));
    }
}
