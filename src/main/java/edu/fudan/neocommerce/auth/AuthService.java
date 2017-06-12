package edu.fudan.neocommerce.auth;

import edu.fudan.neocommerce.exception.IncorrectPasswordException;
import edu.fudan.neocommerce.exception.UserAlreadyExistsException;
import edu.fudan.neocommerce.exception.UserDoesNotExistException;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.UUID;

/**
 * Created by wsy on 6/11/17.
 */
public class AuthService {
    @Autowired
    private UsersService usersService;

    @Autowired
    private TokenService tokenService;

    public UUID getUUID(String header) {
        String prefix = "Bearer ";
        if (!header.startsWith(prefix)) return null;
        return UUID.fromString(header.substring(prefix.length()).trim());
    }

    public Token getToken(String header) {
        return tokenService.get(getUUID(header));
    }

    public Token login(String userName, String password) throws NoSuchAlgorithmException {
        User user = usersService.lookup(userName);
        if (user == null)
            throw new UserDoesNotExistException(userName);
        if (Arrays.equals(UsersService.encryptPassword(password), user.getPassword()))
            return tokenService.add(user);
        throw new IncorrectPasswordException();
    }

    public User signup(String userName, String name, String password) throws NoSuchAlgorithmException {
        if (usersService.exists(userName))
            throw new UserAlreadyExistsException(userName);
        User user = new User(new UserInfo(userName, name, UserInfo.ROLE_CUSTOMER), UsersService.encryptPassword(password));
        usersService.add(user);
        return user;
    }

    public void logout(UUID uuid) {
        tokenService.remove(uuid);
    }
}
