package com.fshoes.core.authentication;

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
    private AccountRepository accountRepository;
    @Autowired
    private JwtUtilities jwtUtilities;
    @Autowired
    private UserLogin userLogin;

    @PostMapping("/login-admin")
    public ObjectRespone loginAdmin(@RequestBody LoginRequest request) {
        String passwordEncode = MD5Util.getMD5(request.getPassword());
        Account account = accountRepository.findByEmailAndPassword(request.getEmail(), passwordEncode).orElse(null);
        if (account != null && account.getRole() != 2)
            return new ObjectRespone(jwtUtilities.generateToken(account.getEmail()));
        return new ObjectRespone(null);
    }

    @PostMapping("/login")
    public ObjectRespone login(@RequestBody LoginRequest request) {
        String passwordEncode = MD5Util.getMD5(request.getPassword());
        Account account = accountRepository.findByEmailAndPassword(request.getEmail(), passwordEncode).orElse(null);
        if (account != null)
            return new ObjectRespone(jwtUtilities.generateToken(account.getEmail()));
        return new ObjectRespone(null);
    }

    @GetMapping
    public ObjectRespone getUserLogin() {
        Account account = userLogin.getUserLogin();
        UserLoginResponse response = null;
        if (account != null) {
            response = new UserLoginResponse();
            response.setEmail(account.getEmail());
            response.setName(account.getFullName());
            response.setAvatar(account.getAvatar());
        }
        return new ObjectRespone(response);
    }
}
