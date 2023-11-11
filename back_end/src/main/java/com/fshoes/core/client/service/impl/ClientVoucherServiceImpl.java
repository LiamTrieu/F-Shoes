package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientVoucherRequest;
import com.fshoes.core.client.model.response.ClientVoucherResponse;
import com.fshoes.core.client.repository.ClientVoucherRepository;
import com.fshoes.core.client.service.ClientVoucherService;
import com.fshoes.core.common.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientVoucherServiceImpl implements ClientVoucherService {
    @Autowired
    private ClientVoucherRepository clientVoucherRepository;

    @Override
    public List<ClientVoucherResponse> getAllVoucherByIdCustomer(ClientVoucherRequest request, UserLogin userLogin) {
        try {
            if (userLogin.getUserLogin() == null) {
                request.setIdCustomer(null);
            } else {
                request.setIdCustomer(userLogin.getUserLogin().getId());
            }
            return clientVoucherRepository.getAllVoucherByIdCustomer(request);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ClientVoucherResponse getVoucherByCode(String codeVoucher) {
        ClientVoucherResponse voucherResponse = clientVoucherRepository.getVoucherByCode(codeVoucher);
        if (voucherResponse == null) {
            return null;
        } else {
            return voucherResponse;
        }
    }

    @Override
    public List<ClientVoucherResponse> getVoucherPublicMyProfileOldest() {
        return clientVoucherRepository.getVoucherPublicMyProfileOldest();
    }

    @Override
    public List<ClientVoucherResponse> getVoucherPublicMyProfileLatest() {
        return clientVoucherRepository.getVoucherPublicMyProfileLatest();
    }

    @Override
    public List<ClientVoucherResponse> getVoucherPrivateMyProfileOldest(UserLogin userLogin) {
        return clientVoucherRepository.getVoucherPrivateMyProfileOldest(userLogin.getUserLogin().getId());
    }

    @Override
    public List<ClientVoucherResponse> getVoucherPrivateMyProfileLatest(UserLogin userLogin) {
        return clientVoucherRepository.getVoucherPrivateMyProfileLatest(userLogin.getUserLogin().getId());
    }
}
