package com.cm.cinematchapp.controllers;

import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateEmailException;
import com.cm.cinematchapp.exceptions.DuplicateUsernameException;
import com.cm.cinematchapp.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class TestThymeController {

    @Autowired
    private UserService userService;

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



}
