package com.fshoes.core.admin.khuyenmai.controller;


import com.fshoes.core.admin.khuyenmai.service.impl.PromotionServiceImpl;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/promotion")
@CrossOrigin("*")
public class PromotionController {

    @Autowired
    private PromotionServiceImpl khuyenMaiService;

    @GetMapping("/get-all")
    public ObjectRespone getAll() {
        return new ObjectRespone(khuyenMaiService.getAll());
    }

    @GetMapping("/get-one/{id}")
    public ObjectRespone getOne(@PathVariable int id) {
        return new ObjectRespone(khuyenMaiService.getOne(id));
    }

    @PostMapping("/add")
    public ObjectRespone addKhuyenMai(@RequestBody Promotion promotion) {
        return new ObjectRespone(khuyenMaiService.addKhuyenMai(promotion));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateKhuyenMai(@RequestBody Promotion promotion, @PathVariable int id) {
        return new ObjectRespone(khuyenMaiService.updateKhuyenMai(promotion, id));
    }

    @GetMapping("/page")
    public ObjectRespone pageKM(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "2") int pageSize){
        return new ObjectRespone(khuyenMaiService.KMPage(page,pageSize));
    }

    @GetMapping("/search-by-name")
    public ObjectRespone getByName(@RequestParam(name = "textSearch") String textSearch,
                                       @RequestParam("page") Integer page,
                                       @RequestParam("pageSize") Integer pageSize ){

        return new ObjectRespone(khuyenMaiService.searchByName(page,pageSize,textSearch));

    }

    @GetMapping("/search-by-status")
    public ObjectRespone getByStatus(@RequestParam(name = "statusSearch") Integer statusSearch,
                                       @RequestParam("page") Integer page,
                                       @RequestParam("pageSize") Integer pageSize ){

        return new ObjectRespone(khuyenMaiService.searchByStatus(page,pageSize,statusSearch));

    }

    @GetMapping("/search-by-time")
    public ObjectRespone getTime(@RequestParam("page") Integer page,
                                     @RequestParam("pageSize") Integer pageSize,
                                     @RequestParam(value = "timeStartSearch") String timeStartSearch,
                                     @RequestParam(value = "timeEndSearch") String timeEndSearch) {
        return new ObjectRespone(khuyenMaiService.searchByTime(page,pageSize,timeStartSearch,timeEndSearch));
    }


}