package com.fshoes.core.admin.sell.service.impl;

import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.admin.sell.repository.AdminSellGetProductRepository;
import com.fshoes.core.admin.sell.service.GetProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetProductServiceImpl implements GetProductService {
    @Autowired
    private AdminSellGetProductRepository getProductRepository;
    @Override
    public List<GetAllProductResponse> getAllProduct() {
        return getProductRepository.getAllProduct();
    }
}
