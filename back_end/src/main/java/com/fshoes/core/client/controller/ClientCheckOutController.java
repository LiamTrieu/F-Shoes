package com.fshoes.core.client.controller;

import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.core.client.service.ClientCheckoutService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.infrastructure.vnpay.VNPayRequest;
import com.fshoes.infrastructure.vnpay.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/client/checkout")
public class ClientCheckOutController {

    @Autowired
    private ClientCheckoutService service;
    @Autowired
    private VNPayService vnPayService;

    @PostMapping
    public ObjectRespone checkout(@RequestBody ClientCheckoutRequest request) {
        return new ObjectRespone(service.thanhToan(request));
    }

    @PostMapping("/submitOrder")
    public String submidOrder(@RequestParam("amount") int orderTotal,
                              @RequestParam("orderInfo") String orderInfo) {
        String baseUrl =  "http://localhost:3000";
        return vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
    }
    @PostMapping("/payment")
    public ResponseEntity<Boolean> processPayment(@RequestBody VNPayRequest request) {
        int paymentStatus = vnPayService.orderReturn(request);

        if (paymentStatus == 1) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
}
