package com.fshoes.core.admin.nhanvien.controller;

import com.fshoes.core.admin.nhanvien.model.request.SearchStaff;
import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.service.StaffService;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/staff")
public class StaffController {
    @Autowired
    private StaffService service;

    @GetMapping("/find-all")
    public ResponseEntity hienThi() {
        return new ResponseEntity(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/search-getPage")
    public PageReponse hienthiPageNo(int page, String searchTen) {
        SearchStaff searchStaff = new SearchStaff();
        searchStaff.setPage(page);
        searchStaff.setSearchTen(searchTen);
        return new PageReponse<>(service.searchStaff(searchStaff));
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody StaffRequest staffRequest) throws ParseException {
        return new ResponseEntity(service.add(staffRequest), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity detail(@PathVariable String id) {
        return new ResponseEntity(service.getOne(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable("id") String id, @RequestBody StaffRequest staffRequest) throws ParseException {
        return new ResponseEntity(service.update(staffRequest, id), HttpStatus.OK);
    }
}
