package com.cm.cinematchapp.services;


import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateObjectException;
import com.cm.cinematchapp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(emailRegex);
    }

//    public Optional<User> authenticateUser(String username, String password) {
//        Optional<User> user = userRepository.findByUsername(username);
//
//        if (user != null && user.getPassword().equals(password)) {
//            return user;
//        }
//
//        return null; // Authentication failed
//    }

    public User createUser(User user) {

        // Throws error if email is taken
        if (userRepository.existsByEmail(user.getEmail())) {
            log.debug("Email already exists: {}", user.getEmail());
            throw new DuplicateObjectException("The email " + user.getEmail() + " is already linked to another account");
        }

        if (!isValidEmail(user.getEmail())) {
            log.debug("Invalid email format: {}", user.getEmail());
            throw new DataIntegrityViolationException("Invalid email format: " + user.getEmail());
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            log.debug("This username is already taken: {}", user.getUsername());
            throw new DuplicateObjectException("This username is already taken");
        }
        // Save the user to the database using the userRepository
        User createdUser = userRepository.save(user);

        return createdUser;
    }




}
