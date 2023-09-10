package com.fshoes.core.admin.sanpham.controller;

import com.fshoes.core.admin.sanpham.model.request.SoleRequest;
import com.fshoes.core.admin.sanpham.service.SoleService;
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
@RequestMapping("/api/sole")
@CrossOrigin("*")
public class SoleController {

    @Autowired
    private SoleService soleService;

    @GetMapping
    public ObjectRespone getAll() {
        return new ObjectRespone(soleService.getAll());
    }

    @GetMapping("/page")
    public PageReponse getPageSole(PageableRequest pageableRequest,
                                   @RequestParam(defaultValue = "") String textSearch) {
        return new PageReponse<>(soleService.getPage(pageableRequest, textSearch));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getSole(@PathVariable int id) {
        return new ObjectRespone(soleService.getById(id));
    }

    @PostMapping("/add")
    public ObjectRespone addSole(@RequestBody SoleRequest soleReq) {
        return new ObjectRespone(soleService.addSole(soleReq));
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateSole(@RequestBody SoleRequest soleReq,
                                    @PathVariable int id) {
        return new ObjectRespone(soleService.updateSole(soleReq, id));
    }

    @PutMapping("/deleted/{id}")
    public ObjectRespone deletedSole(@RequestBody boolean isDeleted,
                                        @PathVariable int id) {
        return new ObjectRespone(soleService.chageDeleted(id, isDeleted));
    }
}
