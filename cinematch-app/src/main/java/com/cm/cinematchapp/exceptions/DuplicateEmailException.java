package com.cm.cinematchapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateEmailException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public DuplicateEmailException() {
        this("This object already exists");
    }
    public DuplicateEmailException(String message) {
        this(message, null);
    }
    public DuplicateEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}
