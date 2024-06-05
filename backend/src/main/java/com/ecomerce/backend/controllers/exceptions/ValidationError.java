package com.ecomerce.backend.controllers.exceptions;


import com.ecomerce.backend.services.exceptions.FieldMessage;

import java.util.ArrayList;
import java.util.List;

public class ValidationError extends StandardError {

    List<FieldMessage> errors = new ArrayList<>();

    public ValidationError(List<FieldMessage> errors) {
        this.errors = errors;
    }

    public ValidationError() {
    }

    public ValidationError(Long timestamp, Integer status, String error, String message, String path) {
        super(timestamp, status, error, message, path);
    }

    public List<FieldMessage> getErrors() {
        return errors;
    }

    public void addError(String fieldName, String message) {
        this.errors.add(new FieldMessage(fieldName, message));
    }
}