package com.fshoes.core.authentication.service;

import com.fshoes.core.authentication.model.request.LoginRequest;
import com.fshoes.core.authentication.model.request.RegisterRequest;
import com.fshoes.core.authentication.model.response.UserLoginResponse;
import com.fshoes.entity.Account;

public interface AuthenticationService {
    String loginAdmin(LoginRequest request);

    String login(LoginRequest request);

    UserLoginResponse userLogin();

    Boolean register(RegisterRequest request);

    Account checkMail(String email);
}