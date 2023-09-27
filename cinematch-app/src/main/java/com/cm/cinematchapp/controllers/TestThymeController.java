package com.cm.cinematchapp.controllers;

import com.cm.cinematchapp.entities.Friendship;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateEmailException;
import com.cm.cinematchapp.exceptions.DuplicateUsernameException;
import com.cm.cinematchapp.services.FriendRequestService;
import com.cm.cinematchapp.services.FriendshipService;
import com.cm.cinematchapp.services.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * THIS IS JUST FOR TESTING BEFORE REACT IMPLEMENTATION
 */
@Controller
public class TestThymeController {

    @Autowired
    private UserService userService;

    @Autowired
    private FriendRequestService friendRequestService;

    @Autowired
    private FriendshipService friendshipService;


    @GetMapping(value="/")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "register"; // Return to the registration form
        }

        try {
            userService.createUser(user);
        } catch (DuplicateUsernameException e) {
            bindingResult.rejectValue("username", "error.user", e.getMessage()); // Add this line to handle the username error
            return "register"; // Return to the registration form
        } catch (DuplicateEmailException e) {
            bindingResult.rejectValue("email", "error.user", e.getMessage());
            return "register"; // Return to the registration form
        }

        return "redirect:/";
    }

    @PostMapping("/main")
    public String showMainPage(@RequestParam("loginUsername") String loginUsername, HttpSession session, Model model) {

        //storing user object for now but should not be stored to session like this
        User user = userService.getByUsername(loginUsername);
        Long userId = user.getUserId();

        session.setAttribute("user", user);

        model.addAttribute("user", user);
        model.addAttribute("users", userService.getUsers());
        model.addAttribute("requests", friendRequestService.getFriendRequestsByRecipientId(userId));
        model.addAttribute("friendships", friendshipService.getFriendshipsByUserId(userId));


        return "main";
    }

    @GetMapping("/main")
    public String showMainPage(HttpSession session, Model model) {

        User user = (User) session.getAttribute("user");
        Long userId = user.getUserId();

        model.addAttribute("user", user);
        model.addAttribute("users", userService.getUsers());
        model.addAttribute("requests", friendRequestService.getFriendRequestsByRecipientId(userId));
        model.addAttribute("friendships", friendshipService.getFriendshipsByUserId(userId));


        return "main";
    }


    @PostMapping("/sendFriendRequest")
    public String sendFriendRequest(@RequestParam("requesterId") Long requesterId,
                                    @RequestParam("recipientId") Long recipientId) {
        friendRequestService.sendFriendRequest(requesterId, recipientId);
        return "redirect:/main"; // Redirect back to the user table after sending the request
    }

    @PostMapping("/acceptFriendRequest")
    public String acceptFriendRequest(@RequestParam("requestId") Long requestId) {
        friendRequestService.acceptFriendRequest(requestId);
        return "redirect:/main"; // Redirect back to the user table after accepting the request
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }



}
