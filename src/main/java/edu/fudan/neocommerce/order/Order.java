package edu.fudan.neocommerce.order;

import edu.fudan.neocommerce.product.Product;

/**
 * Created by wsy on 6/13/17.
 */

public class Order {
    private int id;
    private int userId;
    private Product product;

    public Order(int id, int userId, Product product) {
        this.id = id;
        this.userId = userId;
        this.product = product;
    }

    public int getId() {
        return id;
    }

    void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public Product getProduct() {
        return product;
    }
}
