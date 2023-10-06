package com.cm.cinematchapp.security;

import cn.hutool.jwt.JWTUtil;
import com.cm.cinematchapp.constants.EntityConstants;
import com.cm.cinematchapp.services.UserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Autowired
    private UserDetailService userDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String aHeader = request.getHeader("Authorization");

        if (aHeader ==null || !aHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }

        String aToken = aHeader.split("\\s+")[1];

        if(!JWTUtil.verify(aToken, EntityConstants.kSecuritySignKey.getBytes(StandardCharsets.UTF_8))) {
            log.info("token invalid");
            filterChain.doFilter(request, response);
            return;
        }

        final String username = (String) JWTUtil.parseToken(aToken).getPayload("username");
        UserDetails userDetails = userDetailService.loadUserByUsername(username);

        Object principle = userDetails.getUsername();
        Object credential = userDetails.getPassword();
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(principle, credential);
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);




    }
}
