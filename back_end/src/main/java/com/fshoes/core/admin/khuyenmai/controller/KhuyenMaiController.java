package com.fshoes.core.admin.khuyenmai.controller;

import com.fshoes.core.admin.khuyenmai.service.KhuyenMaiService;
import com.fshoes.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class KhuyenMaiController {
    @Autowired
    KhuyenMaiService khuyenMaiService;

    @GetMapping("/")
    public List<Promotion> getALlKM(){
        return khuyenMaiService.getAll();
    }


}
