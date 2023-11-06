package com.cm.cinematchapp.controllers;

import com.cm.cinematchapp.entities.FriendRequest;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.services.FriendService;
import com.cm.cinematchapp.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The `EntityController` class is responsible for handling HTTP requests related to entities, such as users.
 * It provides endpoints for retrieving entity information.
 *
 * @author Eric Rebadona
 */
@RestController
@RequestMapping(value="/api/entities",
        produces="application/json")
@Slf4j
public class EntityController {

    @Autowired
    private UserService userService;

    @Autowired
    private FriendService friendService;




    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser() {
        try {
            return new ResponseEntity<>(userService.getAuthenticatedUser(), HttpStatus.OK);
        }
        catch(Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * Get a list of all users except the currently authenticated user.
     *
     * @return A ResponseEntity containing a list of users.
     */
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsersExceptAuthenticated() {
        return new ResponseEntity<>(userService.getAllUsersExceptAuthenticated(), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUserByUserId(@PathVariable Long userId) {
            return new ResponseEntity<>(userService.getUser(userId), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/users/{username}")
    public ResponseEntity<?> getUsersByUsername(@PathVariable(required = false) String username) {
        if (username == null || username.trim().isEmpty()) {
            return new ResponseEntity<>(userService.getAllUsersExceptAuthenticated(), HttpStatus.OK);
        }
        return new ResponseEntity<>(userService.findUsersByUsername(username), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/users/friend-requests/{recipient_id}")
    public ResponseEntity<FriendRequest> sendFriendRequest(@PathVariable("recipient_id") Long recipientId) {
            return new ResponseEntity<>(friendService.sendFriendRequest(recipientId), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/users/friend-requests/{recipient_id}")
    public ResponseEntity<Void> removeFriendRequest(@PathVariable("recipient_id") Long recipientId) {
            friendService.removeFriendRequest(recipientId);
            return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/friend-requests")
    public ResponseEntity<?> getFriendRequests() {
        return new ResponseEntity<>(friendService.getFriendRequests(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/friend-requests/{request_id}")
    public ResponseEntity<String> acceptFriendRequest(@PathVariable("request_id") Long requestId) {
        try {
            friendService.acceptFriendRequest(requestId);
            return new ResponseEntity<>("Friend request accepted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to accept friend request", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/friend-requests/{request_id}")
    public ResponseEntity<Void> denyFriendRequest(@PathVariable("request_id") Long requestId) {
        friendService.denyFriendRequest(requestId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/friends")
    public ResponseEntity<?> getFriends() {
        return new ResponseEntity<>(friendService.getFriends(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/friends/{friend_user}")
    public ResponseEntity<User> getFriendUser(@PathVariable("friend_user") User friendUser) {
        return new ResponseEntity<>(userService.getUser(friendUser), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/friends/{friend_user}")
    public ResponseEntity<Void> removeFriend(@PathVariable("friend_user") User friendUser) {
        friendService.removeFriend(friendUser);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
