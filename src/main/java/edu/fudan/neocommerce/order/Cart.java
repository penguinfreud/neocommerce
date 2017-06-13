package edu.fudan.neocommerce.order;

import edu.fudan.neocommerce.product.Product;
import edu.fudan.neocommerce.auth.UserInfo;
import java.util.ArrayList;
import java.util.List;

public class Cart {
    private ShopOrder[] shopOrders;
    private static int nextId = 0;
    public Cart(ShopOrder[] shopOrders) {
        this.shopOrders = shopOrders;
    }

//    public Cart(UserInfo user, Product product) {
//        this.shopOrders = new ArrayList<>();
//        int id = user.getId();
//        int nId = getNextId();
//        Order order = new Order(nId, id, product);
//        List<Order> orders = new ArrayList<>();
//        orders.add(order);
//        shopOrders.add(new ShopOrder(product.getProvider(), orders));
//    }

//    private static int getNextId() {
//        // TODO: this need a query to DB
//        return nextId++;
//    }

//    public void addShopOrder(ShopOrder shopOrder) {
//        shopOrders.add(shopOrder);
//    }
}

class ShopOrder {
    private String shop;
    private Order[] orders;

    public ShopOrder(String shop, Order[] orders) {
        this.shop = shop;
        this.orders = orders;
    }

    public String getShop() { return shop;}
    public Order[] getOrders() { return orders;}

//    public void addOrder(Order order) {
//        orders.add(order);
//    }
}

class Order {
    private int id;
    private int userId;
    private Product product;
    private boolean selected;

    public Order(int id, int userId, Product product) {
        this.id = id;
        this.userId = userId;
        this.product = product;
        this.selected = true;
    }

    public int getId() {return id;}
    public int getUserId() { return userId;}
    public Product getProduct() { return product;}
    public boolean getSelected() { return selected;}
}