package com.fshoes.core.authentication;

import com.fshoes.entity.Account;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserLoginResponse {
    private String email;
    private String name;
    private String avatar;
}
