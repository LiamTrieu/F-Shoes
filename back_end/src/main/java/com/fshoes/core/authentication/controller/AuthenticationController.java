package com.fshoes.core.authentication.controller;

import com.fshoes.core.authentication.model.request.ChangeRequest;
import com.fshoes.core.authentication.model.request.LoginRequest;
import com.fshoes.core.authentication.model.request.RegisterRequest;
import com.fshoes.core.authentication.model.response.UserLoginResponse;
import com.fshoes.core.authentication.service.AuthenticationService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;
import com.fshoes.infrastructure.security.JwtUtilities;
import com.fshoes.repository.AccountRepository;
import com.fshoes.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login-admin")
    public ObjectRespone loginAdmin(@RequestBody LoginRequest request) {
        return new ObjectRespone(authenticationService.loginAdmin(request));
    }

    @PostMapping("/login")
    public ObjectRespone login(@RequestBody LoginRequest request) {
        return new ObjectRespone(authenticationService.login(request));
    }

    
    @PostMapping("/register")
    public ObjectRespone register(@RequestBody RegisterRequest request) {
        return new ObjectRespone(authenticationService.register(request));
    }

    @PostMapping("/change-password")
    public ObjectRespone change(@RequestBody RegisterRequest request) {
        return new ObjectRespone(authenticationService.change(request));
    }
    @PostMapping("/doi-mat-khau")
    public ObjectRespone change(@RequestBody ChangeRequest request) {
        return new ObjectRespone(authenticationService.changePass(request));
    }

    @GetMapping
    public ObjectRespone getUserLogin() {
        return new ObjectRespone(authenticationService.userLogin());
    }

    @GetMapping("/check-mail")
    public ObjectRespone checkMail(@RequestParam String email) {
        return new ObjectRespone(authenticationService.checkMail(email));
    }

    @GetMapping("/send-otp")
    public ObjectRespone sendOtp(@RequestParam String email) {
        return new ObjectRespone(authenticationService.sendOtp(email));
    }
}
