package com.cm.cinematchapp.controllers;

import com.cm.cinematchapp.entities.LoginData;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.services.SecurityService;
import com.cm.cinematchapp.services.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

/**
 * The `ActionController` class is responsible for handling HTTP requests related to actions.
 * It provides endpoints for different actions to be used in the frontend.
 *
 * @author Eric Rebadona
 */
@RestController
@RequestMapping(value="/api/actions",
        produces="application/json",
        consumes="application/json")
@Slf4j
public class ActionController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserService userService;


    /**
     * Handles HTTP POST requests to create a new user (registration).
     *
     * @param user   The user data to be registered.
     * @param result The validation result for the user data.
     * @return A ResponseEntity containing the created user with an HTTP status of CREATED (201) if successful,
     *         or a ResponseEntity with a status of BAD REQUEST (400) if validation fails.
     */
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody @Valid User user, BindingResult result) {

        if (result.hasErrors()) return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    /**
     * Handles HTTP POST requests for user login.
     *
     * @param logout    A boolean flag indicating whether to log out.
     * @param loginData The user login data.
     * @param result    The validation result for the login data.
     * @return A ResponseEntity containing a JWT token for successful login with an HTTP status of OK (200),
     *         or a ResponseEntity with a status of BAD REQUEST (400) if validation fails.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam(value="logout", required=false, defaultValue="false") boolean logout,
                                      @RequestBody @Valid LoginData loginData,
                                      BindingResult result) {
        if (logout) return new ResponseEntity<>(securityService.logout(), HttpStatus.OK);

        if(result.hasErrors()) return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(securityService.login(loginData.getUsername(), loginData.getPassword()), HttpStatus.OK);
    }




}
