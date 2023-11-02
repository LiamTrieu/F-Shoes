package com.fshoes.core.client.service;

import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.entity.Bill;
import com.fshoes.entity.ProductDetail;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ClientCheckoutService {
    Bill thanhToan(ClientCheckoutRequest request);

    String createOrder(ClientCheckoutRequest request);

    List<ProductDetail> orderReturn(HttpServletRequest request);
}
