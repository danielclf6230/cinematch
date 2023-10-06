package com.cm.cinematchapp.services;

import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.ResourceNotFoundException;
import com.cm.cinematchapp.security.UserDetailsImpl;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.cm.cinematchapp.repositories.UserRepository;

@Service
@Transactional
@Slf4j
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {
            log.debug("load user:{}", username);
            User user = userRepository.findByUsername(username).orElseThrow(
                    () -> new ResourceNotFoundException("No user found with username= " + username));
            return new UserDetailsImpl(user);
        } catch (ResourceNotFoundException e) {
            throw new UsernameNotFoundException("No user found with username= " + username);
        }
    }

}

