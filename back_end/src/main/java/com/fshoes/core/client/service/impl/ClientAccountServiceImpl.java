package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.repository.ClientAccountRepository;
import com.fshoes.core.client.service.ClientAccountService;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Optional;

@Service
public class ClientAccountServiceImpl implements ClientAccountService {
    @Autowired
    private ClientAccountRepository repository;

    @Autowired
    private CloudinaryImage cloudinaryImage;

    @Override
    public Account getOneCustomerClient(UserLogin userLogin) {
        return repository.findById(userLogin.getUserLogin().getId()).orElse(null);
    }

    @Override
    public Boolean update(UserLogin userLogin, ClientAccountRequest khachHangRequest) throws ParseException {
        Optional<Account> optionalCustomer = repository.findById(userLogin.getUserLogin().getId());
        if (optionalCustomer.isPresent()) {
            Account customer = khachHangRequest.newCustomer(optionalCustomer.get());
            if(khachHangRequest.getAvatar() != null) {
                customer.setAvatar(cloudinaryImage.uploadAvatar(khachHangRequest.getAvatar()));
            }
            repository.save(customer);
            return true;

        } else {
            return false;
        }
    }
}
