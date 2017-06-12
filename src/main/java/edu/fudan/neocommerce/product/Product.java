package edu.fudan.neocommerce.product;

/**
 * Created by wsy on 6/12/17.
 */
public class Product {
    private int id;
    private String name;
    private String desc;
    private int price;
    private int buyers;
    private String provider;
    private String factory;

    public Product(String name, String desc, int price, int buyers, String provider, String factory) {
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.buyers = buyers;
        this.provider = provider;
        this.factory = factory;
    }

    public int getId() {
        return id;
    }

    void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getDesc() {
        return desc;
    }

    public int getPrice() {
        return price;
    }

    public int getBuyers() {
        return buyers;
    }

    public String getProvider() {
        return provider;
    }

    public String getFactory() {
        return factory;
    }
}
