package com.fshoes.core.client.service;

import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.model.response.ClientProductDetailResponse;
import com.fshoes.core.client.model.response.ClientProductResponse;

import java.util.List;

public interface ClientProductService {
    List<ClientProductResponse> getProducts(String id);

    List<ClientProductDetailResponse> getProductBySize(ClientProductDetailRequest request);
}
