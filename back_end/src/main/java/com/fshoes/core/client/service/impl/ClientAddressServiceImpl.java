package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.response.ClientAddressResponse;
import com.fshoes.core.client.repository.ClientAddressRepository;
import com.fshoes.core.client.service.ClientAddressService;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClientAddressServiceImpl implements ClientAddressService {

    @Autowired
    private ClientAddressRepository repository;
    @Override
    public Page<ClientAddressResponse> getPageAddressByIdCustomer(int p, UserLogin userLogin) {
        try {
            Pageable pageable = PageRequest.of(p,5);
            return repository.getPageAddressByIdCustomer(pageable,userLogin.getUserLogin().getId());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Address getAddressDefault(UserLogin userLogin) {
        return repository.getAddressDefault(userLogin.getUserLogin().getId());
    }
}
