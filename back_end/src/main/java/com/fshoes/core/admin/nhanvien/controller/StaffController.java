package com.fshoes.core.admin.nhanvien.controller;

import com.fshoes.core.admin.nhanvien.model.request.SearchStaff;
import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.service.StaffService;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.PageableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin("*") // chấp nhận yêu cầu từ bên khác
public class StaffController {
    @Autowired
    private StaffService service;

    @GetMapping("/find-all")
    public ResponseEntity hienThi() {
        return new ResponseEntity(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/search-getPage")
    public PageReponse hienthiPageNo(int page, String searchTen) {
        PageableRequest pageableRequest = new PageableRequest();
        pageableRequest.setPage(page);
        SearchStaff searchStaff = new SearchStaff();
        searchStaff.setSearchTen(searchTen);
        return new PageReponse<>(service.searchStaff(pageableRequest, searchStaff));
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody StaffRequest staffRequest, BindingResult result) throws ParseException {
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

}
