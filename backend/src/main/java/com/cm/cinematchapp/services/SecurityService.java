package com.cm.cinematchapp.services;

import cn.hutool.jwt.JWT;
import com.cm.cinematchapp.constants.EntityConstants;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class SecurityService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;


    public String login(String username, String password){

        if (username.length() == 0 || username == null) {
            log.error("Username is null");
        }

        if (password.length() == 0 || password == null) {
            log.error("Password is null");
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);

        authenticationManager.authenticate(authenticationToken);

        Date expireTime = new Date(System.currentTimeMillis() + EntityConstants.kSessionTimeout);
        byte[] signKey = EntityConstants.kSecuritySignKey.getBytes(StandardCharsets.UTF_8);

        String token = JWT.create()
                .setExpiresAt(expireTime)
                .setPayload("username", username)
                .setKey(signKey)
                .sign();

        return token;
    }


    public String logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
        return "";
    }

    public Optional<User> getCurrentLoginUser() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(username);
    }

}
