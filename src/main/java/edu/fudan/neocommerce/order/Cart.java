package edu.fudan.neocommerce.order;

import edu.fudan.neocommerce.product.Product;

public class Cart {

    private Order[] orders;

    public Cart(Order[] orders) {
        this.orders = orders;
    }

    public Order[] getOrders() { return orders; }
}

class Order {
    private int id;
    private int user_id;
    private Product product;

    public Order(int id, int userId, Product product) {
        this.id = id;
        this.user_id = userId;
        this.product = product;
    }

    public int getId() {return id;}
    public int getUserId() { return user_id;}
    public Product getProduct() { return product;}
}