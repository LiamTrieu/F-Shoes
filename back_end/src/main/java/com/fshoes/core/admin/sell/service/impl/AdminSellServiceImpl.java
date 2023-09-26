package com.fshoes.core.admin.sell.service.impl;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.admin.sell.repository.AdminSellGetCustomerRepository;
import com.fshoes.core.admin.sell.repository.AdminSellGetProductRepository;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminSellServiceImpl implements AdminSellService {

    @Autowired
    private AdminSellGetProductRepository getProductRepository;

    @Autowired
    private AdminSellGetCustomerRepository getCustomerRepository;
    @Override
    public PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(getCustomerRepository.FindKhachHang(pageable, request));
    }
    @Override
    public List<GetAllProductResponse> getAllProduct() {
        return getProductRepository.getAllProduct();
    }

}
