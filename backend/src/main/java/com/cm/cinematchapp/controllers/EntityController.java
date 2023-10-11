package com.cm.cinematchapp.controllers;

import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * The `EntityController` class is responsible for handling HTTP requests related to entities, such as users.
 * It provides endpoints for retrieving entity information.
 *
 * @author Eric Rebadona
 */
@RestController
@RequestMapping(value="/api/entities",
        produces="application/json",
        consumes="application/json")
@Slf4j
public class EntityController {

    @Autowired
    private UserService userService;

    //TODO delete method it was just to test connection between backend and frontend
    @GetMapping(value="/user")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }


}
