package com.cm.cinematchapp.controllers;

import com.cm.cinematchapp.entities.Avatar;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.services.SecurityService;
import com.cm.cinematchapp.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(value="/api/images")
@Slf4j
public class ImageController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserService userService;


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/upload/avatar")
    public ResponseEntity<Avatar> uploadAvatar(
            @RequestParam("file") MultipartFile avatarFile) throws IOException {
        return new ResponseEntity<>(userService.uploadAvatar(avatarFile), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/avatar")
    public ResponseEntity<byte[]> getAvatar() throws IOException {
        return new ResponseEntity<>(userService.getAvatar(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/avatar")
    public ResponseEntity<Void> deleteAvatar() throws IOException {
        userService.deleteAvatar();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
