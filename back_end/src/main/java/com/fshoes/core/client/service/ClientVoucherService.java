package com.fshoes.core.client.service;


import com.fshoes.core.client.model.request.ClientVoucherRequest;
import com.fshoes.core.client.model.response.ClientVoucherResponse;
import com.fshoes.core.common.UserLogin;

import java.util.List;

public interface ClientVoucherService {
    List<ClientVoucherResponse> getAllVoucherByIdCustomer(ClientVoucherRequest request, UserLogin userLogin);

    ClientVoucherResponse getVoucherByCode(String codeVoucher);

    List<ClientVoucherResponse> getVoucherPublicMyProfileOldest();

    List<ClientVoucherResponse> getVoucherPublicMyProfileLatest();

    List<ClientVoucherResponse> getVoucherPrivateMyProfileOldest(UserLogin userLogin);

    List<ClientVoucherResponse> getVoucherPrivateMyProfileLatest(UserLogin userLogin);
}
