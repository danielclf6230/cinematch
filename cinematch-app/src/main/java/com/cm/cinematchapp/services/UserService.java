package com.cm.cinematchapp.services;


import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // Save the user to the database using the userRepository
        User createdUser = userRepository.save(user);

        return createdUser;
    }



}
