package edu.fudan.neocommerce.order;

import edu.fudan.neocommerce.product.Product;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

public class OrderService {
    private final AtomicInteger nextId = new AtomicInteger(1);
    private List<Order> orders = new CopyOnWriteArrayList<>();
    private final String ORDERFILE = "order.dat";

    {
        initOrders();
    }

    /*
    * TODO
    * get data from database or something else?
    * current version: to read/write with file
    * */
    private void initOrders() {
        File file = new File(ORDERFILE);
        if (file.exists()) {

        } else {
            try {
                file.createNewFile();

            } catch (IOException e) {
                System.err.println();
            }
        }
    }

    // /api/cart get
    public Cart getCart(int userId) {
        ArrayList<Order> userOrders = new ArrayList<>();
        for (Order order: orders
             ) {
            if (order.getId() == userId) {
                if (order.getProduct().getProvider().equals("NEOCommerce")) {
                    userOrders.add(order);
                } else {
                    // maybe some error happens
                    System.err.println("find a product not by NEOCommerce: " + order.getProduct().getProvider());
                }
            }
        }
        if (userOrders.size() > 0) {
            String shop = userOrders.get(0).getProduct().getProvider();
            Order[] ods = new Order[userOrders.size()];
            ShopOrder shopOrder = new ShopOrder(shop, userOrders.toArray(ods));
            ShopOrder[] sOs = new ShopOrder[1];
            sOs[0] = shopOrder;
            return new Cart(sOs);
        }
        return new Cart(new ShopOrder[0]);
    }

    public void addOrder(int userId, Product product) {
        int id = nextId.getAndIncrement();
        Order order = new Order(id, userId, product);
        orders.add(order);
        return;
    }
}