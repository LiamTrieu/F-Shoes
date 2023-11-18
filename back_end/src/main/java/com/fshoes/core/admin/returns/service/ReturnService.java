package com.fshoes.core.admin.returns.service;

import com.fshoes.core.admin.returns.model.request.GetBillRequest;
import com.fshoes.core.admin.returns.model.response.GetBillResponse;
import com.fshoes.core.common.PageReponse;

public interface ReturnService {

    PageReponse<GetBillResponse> getBill(GetBillRequest request);
}
