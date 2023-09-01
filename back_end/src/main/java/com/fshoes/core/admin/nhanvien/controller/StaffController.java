package com.fshoes.core.admin.nhanvien.controller;

import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/staff")
public class StaffController {
    @Autowired
    private StaffService service;

    @GetMapping("/find-all")
    public ResponseEntity hienThi() {
        return new ResponseEntity(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity show(StaffRequest request) {
        return new ResponseEntity(service.findAll(request), HttpStatus.OK);
    }

    @GetMapping("/show")
    public ResponseEntity hienthiPageNo(Integer page) {
        return new ResponseEntity(service.getStaff(page), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody StaffRequest staffRequest, BindingResult result) {
        return new ResponseEntity(service.add(staffRequest, result), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity detail(@PathVariable Integer id) {
        return new ResponseEntity(service.getOne(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable("id") Integer id, @RequestBody StaffRequest staffRequest) {
        return new ResponseEntity(service.update(staffRequest, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        service.remove(id);
    }

}
