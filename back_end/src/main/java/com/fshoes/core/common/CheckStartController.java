package com.fshoes.core.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/check-start")
public class CheckStartController {

    @GetMapping
    public ObjectRespone checkStart() {
        return new ObjectRespone(true);
    }
}
