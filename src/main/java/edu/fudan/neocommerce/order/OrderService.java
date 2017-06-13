package edu.fudan.neocommerce.order;

import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;
import edu.fudan.neocommerce.product.Product;

import java.io.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class OrderService {
    private final AtomicInteger nextId = new AtomicInteger(1);
//    private List<Order> orders = new CopyOnWriteArrayList<>();
    private final String ORDERID = "next.id";
    private String ORDERFILE = "order";
    private Map<Integer, List<Order>> orders = new ConcurrentHashMap<>();
    private Map<Integer, File> files = new ConcurrentHashMap<>();

    {
        init();
    }

    /*
    * TODO
    * get data from database or something else?
    * current version: to read/write with file
    * */
    private void init() {
        // read nextId
        File idFile = new File(ORDERID);
        if (idFile.exists()) {
            try{
                Scanner scanner = new Scanner(idFile);
                if (scanner.hasNextInt()) {
                    int initialID = scanner.nextInt();
                    nextId.set(initialID);
                }
                scanner.close();
            } catch (FileNotFoundException fnfe) {
                System.err.println(ORDERID + " not found!");
            }
        }

        // read which users have ordered products
        File folder = new File("./");
        File[] fs = folder.listFiles();
        if (fs == null || fs.length == 0)
            return;
        for (File f: fs) {
            if (f.getName().startsWith(ORDERFILE)) {
                String postfix = f.getName().substring(ORDERFILE.length());
                try{
                    int userId = Integer.parseInt(postfix);
                    files.put(userId, f);
                } catch (Exception e) {}
            }
        }
    }

    // /api/cart get
    public Cart getCart(int userId) {
        List<Order> orderList = orders.get(userId);
        if (orderList == null) {
            File f = files.get(userId);
            if (f != null) {
                // read data from this file.
                getUserOrders(userId);
                orderList = orders.get(userId);
                if (orderList == null || orderList.size() == 0) {
                    System.err.println("Empty order list after reading records");
                    return null;
                }
            } else {
                return null;
            }
        }
        Order[] os = new Order[orderList.size()];
        return new Cart(orderList.toArray(os));
    }

    public void addOrder(int userId, Product product) {
        int id = nextId.getAndIncrement();
        Order order = new Order(id, userId, product);
        List<Order> os = orders.get(userId);
        if (os == null) {
            os = new ArrayList<>();
            os.add(order);
            orders.put(userId, os);
        }
        else {
            os.add(order);
        }
        updateOrders(userId);
        return;
    }

    private void getUserOrders(int userId) {
        File f = files.get(userId);
        // should already have been checked
        assert f != null;
        try{
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream(f));
            List<Order> order = (List<Order>)ois.readObject();
            orders.put(userId, order);
        } catch (IOException ioe) {
            System.err.println("Cannot read data file, UserId=" + userId);
        } catch (ClassNotFoundException cnfe) {
            System.err.println("File format error.");
        }
    }

    private void updateOrders(int userId) {
        File f = files.get(userId);
        if (f == null) {
            f = new File(ORDERFILE+userId);
        }
        if ( !f.exists() ) {
            try{
                f.createNewFile();
            } catch (IOException ioe) {
                System.err.println("Cannot create data file. UserId="+userId);
                return;
            }
        }
        try {
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(f));
            List<Order> order = orders.get(userId);
            if (order != null) {
                oos.writeObject(order);
            }
            oos.close();
        } catch (IOException ioe1) {
            System.err.println("Cannot open write stream");
        }
        File idFile = new File(ORDERID);
        if ( !idFile.exists()) {
            try {
                idFile.createNewFile();
            } catch (IOException ioe) {}
        }
        try {
            FileOutputStream fos = new FileOutputStream(idFile);
            int nid = nextId.get();
            fos.write(nid);
            fos.close();
        } catch (IOException ioe1) {}
    }
}