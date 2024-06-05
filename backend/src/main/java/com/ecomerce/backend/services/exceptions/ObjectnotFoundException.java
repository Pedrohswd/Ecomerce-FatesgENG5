package com.ecomerce.backend.services.exceptions;

public class ObjectnotFoundException extends RuntimeException{
    public ObjectnotFoundException(){
        super();
    }

    public ObjectnotFoundException(String message) {
        super(message);
    }
}
