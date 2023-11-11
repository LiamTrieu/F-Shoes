package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.model.request.ClientBillAccountRequest;
import com.fshoes.core.client.model.response.*;
import com.fshoes.core.client.repository.*;
import com.fshoes.core.client.service.ClientAccountService;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class ClientAccountServiceImpl implements ClientAccountService {
    @Autowired
    private ClientAccountRepository repository;

    @Autowired
    private CloudinaryImage cloudinaryImage;

    @Autowired
    private ClientBillRepository billRepository;

    @Autowired
    private ClientBillDetailRepository billDetailRepository;

    @Autowired
    private ClientBillHistoryRepository billHistoryRepository;

    @Autowired
    private ClientTransactionRepository transactionRepository;

    @Override
    public Account getOneCustomerClient(UserLogin userLogin) {
        return repository.findById(userLogin.getUserLogin().getId()).orElse(null);
    }

    @Override
    public Boolean update(UserLogin userLogin, ClientAccountRequest request) throws ParseException {
        Optional<Account> optionalCustomer = repository.findById(userLogin.getUserLogin().getId());
        if (optionalCustomer.isPresent()) {
            Account customer = request.newCustomer(optionalCustomer.get());
            if(request.getAvatar() != null) {
                customer.setAvatar(cloudinaryImage.uploadAvatar(request.getAvatar()));
            }
            repository.save(customer);
            return true;

        } else {
            return false;
        }
    }

    @Override
    public List<ClientCustomerResponse> getAll() {
        return repository.getAllAccount();
    }

    @Override
    public List<ClientBillAccountResponse> getALlBill(ClientBillAccountRequest status) {
        return billRepository.getALlBill(status);
    }

    @Override
    public List<ClientBillDetailResponse> getBillDetailsByBillId(String idBill) {
        return billDetailRepository.getBillDetailsByBillId(idBill);
    }

    @Override
    public List<CLientBillHistoryResponse> getListBillHistoryByIdBill(String idBill) {
        return billHistoryRepository.getListBillHistoryByIdBill(idBill);
    }

    @Override
    public List<ClientTransactionResponse> getListTransactionByIdBill(String idBill) {
        return transactionRepository.getTransactionByBillId(idBill);
    }
}
