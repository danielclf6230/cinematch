package com.cm.cinematchapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateObjectException extends RuntimeException {

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
