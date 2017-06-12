package edu.fudan.neocommerce.product;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by wsy on 6/12/17.
 */
public class ProductsService {
    private final AtomicInteger nextId = new AtomicInteger(1);
    private Map<Integer, Product> products = new ConcurrentHashMap();

    {
        add(new Product("ChairDest2", "A desk with papers and a chair", 256, 12, "NEOCommerce", "Shanghai"));
        add(new Product("Drehstuhl", "Office chair", 128, 256, "NEOCommerce", "Beijing"));
        add(new Product("ChairDesk", "Chair Desk for schools", 233, 89, "NEOCommerce", "Shenzhen"));
    }

    public Collection<Product> getAll() {
        return products.values();
    }

    public Product get(int id) {
        return products.get(id);
    }

    public int add(Product product) {
        int id = nextId.getAndIncrement();
        product.setId(id);
        products.put(id, product);
        return id;
    }

    public void remove(int id) {
        products.remove(id);
    }
}
