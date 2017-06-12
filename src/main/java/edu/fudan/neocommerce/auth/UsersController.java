package edu.fudan.neocommerce.auth;

import edu.fudan.neocommerce.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by wsy on 6/11/17.
 */
@Controller
@RequestMapping(value = "/api/users")
public class UsersController {
    @Autowired
    private AuthService authService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsersService usersService;

    private void checkAuth(String auth) {
        Token token = authService.getToken(auth);
        if (token == null)
            throw new UnauthorizedException();
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<UserInfo> getUsers(@RequestHeader(value = "Authorization") String auth) {
        checkAuth(auth);
        return tokenService.getAll().stream().map(Token::getUser).map(User::getUserInfo).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    @ResponseBody
    public UserInfo getUser(@RequestHeader("Authorization") String auth, @PathVariable(name = "username") String userName) {
        checkAuth(auth);
        return usersService.lookup(userName).getUserInfo();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String signup(@RequestBody SignupInfo signupInfo) throws NoSuchAlgorithmException {
        authService.signup(signupInfo.getUserName(), signupInfo.getName(), signupInfo.getPassword());
        return "null";
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    @ResponseBody
    public String removeUser(@RequestHeader("Authorization") String auth, @PathVariable(name = "username") String userName) {
        Token token = authService.getToken(auth);
        if (token == null || !token.getUser().getUserInfo().getUserName().equals(userName))
            throw new UnauthorizedException();
        usersService.remove(token.getUser(), tokenService);
        return "null";
    }
}

class SignupInfo {
    private String userName, name, password;

    public String getUserName() {
        return userName;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}
