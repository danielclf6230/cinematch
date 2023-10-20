package com.cm.cinematchapp.services;


import com.cm.cinematchapp.dto.RegistrationDTO;
import com.cm.cinematchapp.entities.Role;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateObjectException;
import com.cm.cinematchapp.exceptions.ResourceNotFoundException;
import com.cm.cinematchapp.repositories.RoleRepository;
import com.cm.cinematchapp.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * The `UserService` class provides services for managing user-related operations, such as user creation and retrieval.
 * It interacts with the `UserRepository` to perform database operations.
 *
 * @author Eric Rebadona
 */
@Service
@Transactional
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SecurityService securityService;

    /**
     * Retrieves a list of all users in the system.
     *
     * @return A list of user entities.
     */
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their username.
     *
     * @param username The username of the user to retrieve.
     * @return An optional user entity or an empty optional if not found.
     */
    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsernameIgnoreCase(username);
    }


    /**
     * Checks if an email is in a valid format.
     *
     * @param email The email to validate.
     * @return `true` if the email is valid; otherwise, `false`.
     */
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(emailRegex);
    }

    /**
     * Creates a new user in the system.
     *
     * @return The created user entity.
     * @throws DuplicateObjectException if the email or username is already associated with another account.
     */
    public User createUser(RegistrationDTO registrationDTO) {

        // Throws error if email is taken
        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            log.debug("Email already exists: {}", registrationDTO.getEmail());
            throw new DuplicateObjectException("The email " + registrationDTO.getEmail() + " is already linked to another account");
        }

        if (!isValidEmail(registrationDTO.getEmail())) {
            log.debug("Invalid email format: {}", registrationDTO.getEmail());
            throw new DataIntegrityViolationException("Invalid email format: " + registrationDTO.getEmail());
        }

        if (userRepository.existsByUsername(registrationDTO.getUsername())) {
            log.debug("This username is already taken: {}", registrationDTO.getUsername());
            throw new DuplicateObjectException("This username is already taken");
        }

        User user = new User();
        user.setFirstName(registrationDTO.getFirstName());
        user.setLastName(registrationDTO.getLastName());
        user.setUsername(registrationDTO.getUsername());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword())); // Hash and save the password

        Role userRole = roleRepository.findByName("ROLE_USER");
        if (userRole != null) {
            user.setRoles(new ArrayList<>(Collections.singletonList(userRole)));
        }

        // Save the user to the database using the userRepository
        User createdUser = userRepository.save(user);

        return createdUser;
    }


    public List<User> getAllUsersExceptAuthenticated() {
        return userRepository.findByUserIdNot(securityService.getCurrentLoginUserId());
    }


    public List<User> findUsersByUsername(String username) {
        return userRepository.findByUsernameContainingIgnoreCaseAndUserIdNot(username, securityService.getCurrentLoginUserId());
    }



    public void addRoleToUser(Long userId, String roleName) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException());
        Role role = roleRepository.findByName(roleName);
        if (role != null) {
            user.getRoles().add(role);
            userRepository.save(user);
        }
    }

    @PostConstruct
    public void createRolesIfNotExists() {
        if (roleRepository.findByName("ROLE_ADMIN") == null) {
            Role adminRole = new Role("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }

        if (roleRepository.findByName("ROLE_USER") == null) {
            Role userRole = new Role("ROLE_USER");
            roleRepository.save(userRole);
        }
    }

}
