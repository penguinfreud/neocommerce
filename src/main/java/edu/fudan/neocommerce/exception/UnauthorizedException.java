package edu.fudan.neocommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by wsy on 6/11/17.
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {}

    public UnauthorizedException(String msg) {
        super(msg);
    }
}
