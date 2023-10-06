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


    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody @Valid User user, BindingResult result) {

        if (result.hasErrors()) return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam(value="logout", required=false, defaultValue="false") boolean logout,
                                      @RequestBody @Valid LoginData loginData,
                                      BindingResult result) {
        if (logout) return new ResponseEntity<>(securityService.logout(), HttpStatus.OK);

        if(result.hasErrors()) return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(securityService.login(loginData.getUsername(), loginData.getPassword()), HttpStatus.OK);
    }




}
