package com.fshoes.infrastructure.security;

import com.fshoes.entity.Account;
import com.fshoes.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public Account loadUserByUsername(String email) throws UsernameNotFoundException {
        return accountRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("User not found !"));
    }


}