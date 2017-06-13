package edu.fudan.neocommerce.order;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class Cart {
    private List<Order> orders = new CopyOnWriteArrayList<>();

    public List<Order> getOrders() {
        return orders;
    }
}