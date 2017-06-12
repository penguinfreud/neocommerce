package edu.fudan.neocommerce.auth;

import java.util.UUID;

/**
 * Created by wsy on 6/11/17.
 */
public class ClientToken extends UserInfo {
    private UUID token;

    public ClientToken(Token token) {
        super(token.getUser().getUserInfo());
        this.token = token.getUuid();
    }

    public UUID getToken() {
        return token;
    }

}
