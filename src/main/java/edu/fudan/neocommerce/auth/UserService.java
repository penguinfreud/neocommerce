package edu.fudan.neocommerce.auth;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by wsy on 6/11/17.
 */
public class UserService {
    public static final AtomicInteger nextId = new AtomicInteger(1);
    private final Map<String, User> users = new ConcurrentHashMap<>();

    {
        try {
            User admin = new User(new UserInfo("admin", "admin", UserInfo.ROLE_ADMIN), encryptPassword("admin"));
            admin.getUserInfo().setId(nextId.getAndIncrement());
            users.put("admin", admin);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public void add(User user) {
        if (users.putIfAbsent(user.getUserInfo().getUserName(), user) != null)
            throw new RuntimeException("User already exists");
        user.getUserInfo().setId(nextId.getAndIncrement());
    }

    public boolean exists(String userName) {
        return users.containsKey(userName);
    }

    public void remove(User user, TokenService tokenService) {
        if (users.remove(user.getUserInfo().getUserName()) == null)
            throw new RuntimeException("User does not exist");
        user.removeAllTokens(tokenService);
    }

    public User lookup(String userName) {
        return users.get(userName);
    }

    static byte[] encryptPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        return messageDigest.digest(password.getBytes());
    }
}
