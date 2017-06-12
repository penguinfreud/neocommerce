package edu.fudan.neocommerce.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.UUID;

/**
 * Created by wsy on 6/11/17.
 */
@Controller
public class AuthController {
    @Autowired
    private AuthService authService;

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    @ResponseBody
    public ClientToken login(@RequestBody UserNameAndPassword userNameAndPassword) throws NoSuchAlgorithmException {
        return new ClientToken(authService.login(userNameAndPassword.getUserName(), userNameAndPassword.getPassword()));
    }

    @RequestMapping(value = "/api/logout", method = RequestMethod.GET)
    @ResponseBody
    public String logout(@RequestHeader("Authorization") String auth) {
        authService.logout(authService.getUUID(auth));
        return "null";
    }
}

class UserNameAndPassword {
    private String userName, password;

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
