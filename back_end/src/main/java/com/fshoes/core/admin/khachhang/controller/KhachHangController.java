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


    public List<KhachHangRespone> seriolizeList(List<Customer> lst){
        List iteams = new ArrayList();
        for(Customer cu : lst) iteams.add(new KhachHangRespone(cu));
        return iteams;
    }

    @GetMapping("/get-all")
    public List<?> getAll(Model model){
        return seriolizeList(khachHangService.getAll());
    }

    @GetMapping("/get-page")
    public List<?> getPage(@RequestParam( defaultValue = "0")int p){
        return seriolizeList(khachHangService.getPage(p).toList());
    }


    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Customer cu){
        String error = "";
        if(!error.isEmpty()){
           return ResponseEntity.badRequest().body(error);
        }
        khachHangService.save(cu);
       return ResponseEntity.ok(new KhachHangRespone(cu));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Customer cu){
        String error = "";
        if(!error.isEmpty()){
            return ResponseEntity.badRequest().body(error);
        }
        cu.setId(id);
        khachHangService.save(cu);
        return ResponseEntity.ok(new KhachHangRespone(cu));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id){
        khachHangService.delete(id);
    }
}
