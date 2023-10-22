package com.cm.cinematchapp.services;


import com.cm.cinematchapp.constants.EntityConstants;
import com.cm.cinematchapp.dto.RegistrationDTO;
import com.cm.cinematchapp.entities.Avatar;
import com.cm.cinematchapp.entities.Role;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateObjectException;
import com.cm.cinematchapp.exceptions.ResourceNotFoundException;
import com.cm.cinematchapp.repositories.AvatarRepository;
import com.cm.cinematchapp.repositories.RoleRepository;
import com.cm.cinematchapp.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    @Autowired
    private AvatarRepository avatarRepository;

    /**
     * Retrieves a list of all users in the system.
     *
     * @return A list of user entities.
     */
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getAuthenticatedUser() {
        return userRepository.findByUserId(securityService.getCurrentLoginUserId()).orElse(null);
    }

    public User getUser(Long userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }

    public User getUser(User user) {
        return userRepository.findByUserId(user.getUserId()).orElse(null);
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
    public void createDefaultAvatarIfNotExists() throws IOException {

        if (avatarRepository.findByPath(EntityConstants.kDefaultAvatar) == null) {
            Path avatarPath = Paths.get(EntityConstants.kDefaultAvatar);
            Avatar avatar = new Avatar();
            avatar.setFilename("default_avatar.png");
            avatar.setSize(Files.size(avatarPath));
            avatar.setPath(EntityConstants.kDefaultAvatar);
            avatarRepository.save(avatar);
        }
    }

    public Avatar uploadAvatar(MultipartFile avatarFile) throws IOException {

        User user = securityService.getCurrentLoginUser().get();

        //TODO change to cloud? something else rather than local file?

        String uniqueFilename = UUID.randomUUID() + "_" + avatarFile.getOriginalFilename();
        String localFilePath = EntityConstants.kAvatarPath + uniqueFilename;
        Path localPath = Paths.get(localFilePath);

        Files.copy(avatarFile.getInputStream(), localPath, StandardCopyOption.REPLACE_EXISTING);

        Avatar avatar = new Avatar();
        avatar.setFilename(uniqueFilename);
        avatar.setPath(localFilePath);
        avatar.setSize(avatarFile.getSize());
        avatar = avatarRepository.save(avatar);

        if (user.getAvatar() != null) {
            deleteAvatar();
        }

        user.setAvatar(avatar);
        userRepository.save(user);
        return avatar;
    }

    public byte[] getAvatar() throws IOException{
        User user = securityService.getCurrentLoginUser().get();
        Avatar avatar = user.getAvatar();

        if(avatar == null) {
            avatar = avatarRepository.findByFilename("default_avatar.png");
            Path defaultPath = Paths.get(avatar.getPath());
            return Files.readAllBytes(defaultPath);
        }

            Path avatarPath = Paths.get(avatar.getPath());
            return Files.readAllBytes(avatarPath);

    }

    public void deleteAvatar() throws IOException{
        User user = securityService.getCurrentLoginUser().get();

        Avatar avatar = user.getAvatar();

        if (avatar != null) {
            String avatarPath = avatar.getPath();
            Path path = Paths.get(avatarPath);

            user.setAvatar(null);
            avatarRepository.delete(avatar);

            Files.delete(path);
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
