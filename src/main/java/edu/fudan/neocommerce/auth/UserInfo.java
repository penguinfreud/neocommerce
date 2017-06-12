package edu.fudan.neocommerce.auth;

/**
 * Created by wsy on 6/11/17.
 */
public class UserInfo {
    public static final int ROLE_ADMIN = 1, ROLE_CUSTOMER = 2;
    private int id;
    private String userName;
    private String name;
    private int type;

    public UserInfo(String userName, String name, int type) {
        this.userName = userName;
        this.name = name;
        this.type = type;
    }

    public UserInfo(UserInfo userInfo) {
        this(userInfo.userName, userInfo.name, userInfo.type);
        this.id = userInfo.id;
    }

    public int getId() {
        return id;
    }

    void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getType() {
        return type;
    }
}
