package com.fshoes.core.client.service;

import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.model.response.ClientCustomerResponse;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;

import java.text.ParseException;
import java.util.List;

public interface ClientAccountService {

    Account getOneCustomerClient(UserLogin userLogin);

    Boolean update(UserLogin userLogin, ClientAccountRequest request) throws ParseException;

    List<ClientCustomerResponse> getAll();
}
