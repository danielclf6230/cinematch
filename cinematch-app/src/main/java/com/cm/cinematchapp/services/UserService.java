package com.cm.cinematchapp.services;


import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateObjectException;
import com.cm.cinematchapp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {

        // Throws error if email is taken
        if (userRepository.existsByEmail(user.getEmail())) {
            log.debug("Email already exists: {}", user.getEmail());
            throw new DuplicateObjectException("The email " + user.getEmail() + " already exists.");
        }

        if (!isValidEmail(user.getEmail())) {
            log.debug("Invalid email format: {}", user.getEmail());
            throw new DataIntegrityViolationException("Invalid email format: " + user.getEmail());
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


    public User getUserById(Long userId) {
       return userRepository.getUserByUserId(userId);
    }
}
