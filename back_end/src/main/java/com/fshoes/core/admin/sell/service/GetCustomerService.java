package com.fshoes.core.admin.sell.service;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.common.PageReponse;

public interface GetCustomerService {

    PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request);
}
