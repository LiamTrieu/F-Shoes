package com.fshoes.core.client.controller;

import com.fshoes.core.admin.returns.model.request.GetReturnRequest;
import com.fshoes.core.admin.returns.model.request.ReturnRequest;
import com.fshoes.core.admin.returns.service.ReturnService;
import com.fshoes.core.client.service.ClientReturnService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/returns")
public class ClientReturnsController {

    @Autowired
    private ReturnService returnService;
    @Autowired
    private ClientReturnService clientReturnService;

    @GetMapping("/bill-id/{id}")
    public ObjectRespone getBillId(@PathVariable("id") String id){
        return new ObjectRespone(returnService.getBillId(id));
    }

    @GetMapping("/bill-detail/{id}")
    public ObjectRespone getBillDetail(@PathVariable("id") String id){
        return new ObjectRespone(returnService.getBillDetail(id));
    }

    @PostMapping ("/request")
    public ObjectRespone acceptReturn(@RequestBody ReturnRequest request){
        return new ObjectRespone(clientReturnService.requestReturn(request));
    }

    @GetMapping("")
    public ObjectRespone getReturn(GetReturnRequest request){
        return new ObjectRespone(clientReturnService.getReturn(request));
    }
    @PutMapping ("/huy/{id}")
    public ObjectRespone huyReturn(@PathVariable("id") String id){
        return new ObjectRespone(returnService.huyReturn(id));
    }
}
