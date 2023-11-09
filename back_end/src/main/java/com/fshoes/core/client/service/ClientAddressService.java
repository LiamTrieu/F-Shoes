package com.fshoes.core.client.service;

import com.fshoes.core.client.model.response.ClientAddressResponse;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Address;
import org.springframework.data.domain.Page;

public interface ClientAddressService {
    Page<ClientAddressResponse> getPageAddressByIdCustomer(int p, UserLogin userLogin);

    Address getAddressDefault(UserLogin userLogin);
}
