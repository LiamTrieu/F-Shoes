package com.fshoes.core.client.service;

import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;

import java.text.ParseException;

public interface ClientAccountService {

    Account getOneCustomerClient(UserLogin userLogin);

    Boolean update(UserLogin userLogin, ClientAccountRequest request) throws ParseException;
}
