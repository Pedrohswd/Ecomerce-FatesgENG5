package com.ecomerce.backend.services.exceptions;

public class DataIntegrityViolationException extends RuntimeException {
    public DataIntegrityViolationException() {

    }

    public DataIntegrityViolationException(String message) {
        super(message);
    }
}
