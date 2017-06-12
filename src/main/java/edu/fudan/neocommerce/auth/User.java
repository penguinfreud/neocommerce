package edu.fudan.neocommerce.auth;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by wsy on 6/11/17.
 */
public class User {
    private UserInfo userInfo;
    private byte[] password;
    private List<UUID> uuids = new CopyOnWriteArrayList<>();

    public User(UserInfo userInfo, byte[] password) {
        this.userInfo = userInfo;
        this.password = password;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public byte[] getPassword() {
        return password;
    }

    public void setPassword(byte[] password) {
        this.password = password;
    }

    public void addToken(UUID uuid) {
        uuids.add(uuid);
    }

    public void removeAllTokens(TokenService tokenService) {
        uuids.forEach(tokenService::remove);
    }
}
