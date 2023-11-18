package com.fshoes.core.admin.returns.controller;

import com.fshoes.core.admin.returns.model.request.GetBillRequest;
import com.fshoes.core.admin.returns.service.ReturnService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/returns")
public class AdReturnsController {

    @Autowired
    private ReturnService returnService;

    @GetMapping("/bill")
    public ObjectRespone getBill(GetBillRequest request){
        return new ObjectRespone(returnService.getBill(request));
    }
}
