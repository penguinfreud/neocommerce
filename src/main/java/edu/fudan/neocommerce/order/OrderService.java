package edu.fudan.neocommerce.order;

import java.util.concurrent.atomic.AtomicInteger;

import edu.fudan.neocommerce.auth.User;

public class OrderService {
    private final AtomicInteger nextId = new AtomicInteger(1);

    public void addOrder(User user, Order order) {
        order.setId(nextId.getAndIncrement());
        user.getCart().getOrders().add(order);
    }
}
