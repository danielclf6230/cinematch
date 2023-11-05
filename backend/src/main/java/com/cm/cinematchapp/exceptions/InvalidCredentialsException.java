package com.cm.cinematchapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidCredentialsException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;


    public InvalidCredentialsException() {
        this("Invalid credentials");
    }


    public InvalidCredentialsException(String message) {
        this(message, null);
    }


    public InvalidCredentialsException(String message, Throwable cause) {
        super(message, cause);
    }
}