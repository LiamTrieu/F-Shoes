package com.fshoes.core.admin.khachhang.controller;

import com.fshoes.core.admin.khachhang.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ghn")
public class ApiGhnController {
    @Autowired
    private DiaChiService diaChiService;

    @GetMapping("/getProvince")
    public ResponseEntity<?> getProvince(){
        return diaChiService.getAllProvince();
    }

    @GetMapping("/getDistrict")
    public ResponseEntity<?> getDistrict( Integer idProvince){
        return diaChiService.getAllDistrict(idProvince);
    }

    @GetMapping("/getWard")
    public ResponseEntity<?> getWard( Integer idDistrict){
        return diaChiService.getAllWard(idDistrict);
    }

}
