package com.cm.cinematchapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateObjectException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public DuplicateObjectException() {
        this("This object already exists");
    }
    public DuplicateObjectException(String message) {
        this(message, null);
    }
    public DuplicateObjectException(String message, Throwable cause) {
        super(message, cause);
    }
}
