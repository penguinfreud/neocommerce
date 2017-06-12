package edu.fudan.neocommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by wsy on 6/11/17.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IncorrectPasswordException extends RuntimeException {
    public IncorrectPasswordException() {
        super("Incorrect password");
    }
}
