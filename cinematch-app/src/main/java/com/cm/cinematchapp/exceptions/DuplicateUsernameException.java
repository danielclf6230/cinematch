package com.cm.cinematchapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateUsernameException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public DuplicateUsernameException() {
        this("This object already exists");
    }
    public DuplicateUsernameException(String message) {
        this(message, null);
    }
    public DuplicateUsernameException(String message, Throwable cause) {
        super(message, cause);
    }
}
