package com.fshoes.core.client.service;


import com.fshoes.core.client.model.request.ClientVoucherRequest;
import com.fshoes.core.client.model.response.ClientVoucherResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ClientVoucherService {
    List<ClientVoucherResponse> getAllVoucherByIdCustomer(ClientVoucherRequest request);
}
