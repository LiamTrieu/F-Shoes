package com.fshoes.core.client.service;

import com.fshoes.core.client.model.request.ClientAddCartRequest;
import com.fshoes.core.client.model.response.ClientCartResponse;

import java.util.List;

public interface ClientCartService {
    List<ClientCartResponse> getCart();

    Boolean addCart(ClientAddCartRequest request);
    Boolean setCart(List<ClientAddCartRequest> request);
}
