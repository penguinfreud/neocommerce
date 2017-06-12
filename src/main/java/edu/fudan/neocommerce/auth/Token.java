package edu.fudan.neocommerce.auth;

import java.util.UUID;

/**
 * Created by wsy on 6/11/17.
 */
public class Token {
    private final UUID uuid;
    private final User user;

    public Token(UUID uuid, User user) {
        this.uuid = uuid;
        this.user = user;
    }

    public UUID getUuid() {
        return uuid;
    }

    public User getUser() {
        return user;
    }
}
