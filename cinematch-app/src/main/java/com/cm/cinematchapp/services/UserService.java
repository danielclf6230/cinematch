package com.cm.cinematchapp.services;


import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateEmailException;
import com.cm.cinematchapp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    public User createUser(User user) {

        // Throws error if email is taken
        if (userRepository.existsByEmail(user.getEmail())) {
            log.debug("Email already exists: {}", user.getEmail());
            throw new DuplicateEmailException("The email " + user.getEmail() + " is already linked to another account");
        }

        if (!isValidEmail(user.getEmail())) {
            log.debug("Invalid email format: {}", user.getEmail());
            throw new DataIntegrityViolationException("Invalid email format: " + user.getEmail());
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            log.debug("This username is already taken: {}", user.getUsername());
            throw new DuplicateEmailException("This username is already taken");
        }
        // Save the user to the database using the userRepository
        User createdUser = userRepository.save(user);

        return createdUser;
    }

    private boolean isValidEmail(String email) {
        // Implement email validation logic using regular expressions or other methods.
        // This example checks for a basic email format: <local-part>@<domain>
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(emailRegex);
    }

    public User authenticateUser(String username, String password) {
        User user = userRepository.getUserByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null; // Authentication failed
    }



    public User getUserById(Long userId) {
       return userRepository.getUserByUserId(userId);
    }
}
