package com.fshoes.core.admin.sell.service.impl;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.repository.AdminSellGetCustomerRepository;
import com.fshoes.core.admin.sell.service.GetCustomerService;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class GetCustomerServiceImpl implements GetCustomerService {

    @Autowired
    private AdminSellGetCustomerRepository getCustomerRepository;
    @Override
    public PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageReponse<>(getCustomerRepository.FindKhachHang(pageable,request));
    }
}
