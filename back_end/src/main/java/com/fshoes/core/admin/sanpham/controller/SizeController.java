package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.SizeRequest;
import com.fshoes.core.admin.sanpham.service.SizeService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.PageableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/size")
@CrossOrigin("*")
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping
    public ObjectRespone getAll() {
        return new ObjectRespone(sizeService.getAll());
    }

    @GetMapping("/page")
    public PageReponse getPageSize(PageableRequest pageableRequest,
                                   @RequestParam(defaultValue = "") String textSearch) {
        return new PageReponse<>(sizeService.getPage(pageableRequest, textSearch));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getSize(@PathVariable int id) {
        return new ObjectRespone(sizeService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addSize(@RequestBody SizeRequest sizeReq) {
        return new ObjectRespone(sizeService.addSize(sizeReq));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateSize(@RequestBody SizeRequest sizeReq,
                                    @PathVariable int id) {
        return new ObjectRespone(sizeService.updateSize(sizeReq, id));
    }

    @PutMapping("/deleted/{id}")
    public ObjectRespone deletedSize(@RequestBody boolean isDeleted,
                                        @PathVariable int id) {
        return new ObjectRespone(sizeService.chageDeleted(id, isDeleted));
    }
}
