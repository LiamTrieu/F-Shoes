package com.fshoes.core.client.service;

import com.fshoes.core.client.model.request.ClientCheckoutRequest;
import com.fshoes.entity.Bill;

public interface ClientCheckoutService {
    Bill thanhToan(ClientCheckoutRequest request);
}
