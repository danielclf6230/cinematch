//package com.cm.cinematchapp.controllers;
//
//import com.cm.cinematchapp.entities.User;
//import com.cm.cinematchapp.exceptions.DuplicateObjectException;
//import com.cm.cinematchapp.services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/users")
//    public ResponseEntity<String> createUser(@RequestBody User user) {
//        try {
//            userService.createUser(user);
//            return ResponseEntity.ok("User created successfully");
//        } catch (DuplicateObjectException e) {
//            // The global exception handler will handle this exception
//            throw e;
//        }
//    }
//}
