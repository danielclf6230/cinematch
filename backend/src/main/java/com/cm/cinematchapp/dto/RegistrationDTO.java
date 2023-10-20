package com.cm.cinematchapp.dto;

import lombok.Data;

@Data
public class RegistrationDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
}