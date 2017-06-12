package edu.fudan.neocommerce.auth;

import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by wsy on 6/11/17.
 */
public class TokenService {
    private final Map<UUID, Token> tokenMap = new ConcurrentHashMap<>();

    public Token add(User user) {
        UUID uuid = UUID.randomUUID();
        Token token = new Token(uuid, user);
        tokenMap.put(uuid, token);
        return token;
    }

    public Token get(UUID uuid) {
        return tokenMap.get(uuid);
    }

    public Collection<Token> getAll() {
        return tokenMap.values();
    }

    public void remove(UUID uuid) {
        tokenMap.remove(uuid);
    }
}
