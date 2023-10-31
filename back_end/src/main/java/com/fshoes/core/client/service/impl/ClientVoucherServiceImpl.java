package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientVoucherRequest;
import com.fshoes.core.client.model.response.ClientVoucherResponse;
import com.fshoes.core.client.repository.ClientVoucherRepository;
import com.fshoes.core.client.service.ClientVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientVoucherServiceImpl implements ClientVoucherService {
    @Autowired
    private ClientVoucherRepository clientVoucherRepository;

    @Override
    public List<ClientVoucherResponse> getAllVoucherByIdCustomer(ClientVoucherRequest request) {
        try {
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
}
