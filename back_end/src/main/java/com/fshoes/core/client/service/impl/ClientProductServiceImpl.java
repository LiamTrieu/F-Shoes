package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.model.response.ClientProductDetailResponse;
import com.fshoes.core.client.model.response.ClientProductResponse;
import com.fshoes.core.client.repository.ClientProductDetailRepository;
import com.fshoes.core.client.service.ClientProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientProductServiceImpl implements ClientProductService {

    @Autowired
    private ClientProductDetailRepository clientProductDetailRepository;

    @Override
    public List<ClientProductResponse> getProducts(String id) {
        return clientProductDetailRepository.getProducts(id);
    }

    @Override
    public List<ClientProductDetailResponse> getProductBySize(ClientProductDetailRequest request) {
        return clientProductDetailRepository.getAllSize(request);
    }

}
