package com.cm.cinematchapp.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    @Serial
    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException() {
        this("Username not found");
    }
    public ResourceNotFoundException(String message) {
        this(message, null);
    }
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
