package com.fshoes.core.client.service;

import com.fshoes.core.admin.returns.model.request.GetReturnRequest;
import com.fshoes.core.admin.returns.model.request.ReturnRequest;
import com.fshoes.core.admin.returns.model.response.GetReturnResponse;
import com.fshoes.core.common.PageReponse;

public interface ClientReturnService {
    Boolean requestReturn(ReturnRequest request);

    PageReponse<GetReturnResponse> getReturn(GetReturnRequest request);

}
