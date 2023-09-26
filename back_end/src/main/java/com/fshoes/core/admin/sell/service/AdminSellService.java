package com.fshoes.core.admin.sell.service;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.common.PageReponse;

import java.util.List;

public interface AdminSellService {

    List<GetAllProductResponse> getAllProduct();

    PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request);
}
