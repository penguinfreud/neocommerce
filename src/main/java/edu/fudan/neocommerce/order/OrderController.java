package edu.fudan.neocommerce.order;

import edu.fudan.neocommerce.auth.AuthService;
import edu.fudan.neocommerce.auth.Token;
import edu.fudan.neocommerce.exception.UnauthorizedException;
import edu.fudan.neocommerce.product.Product;
import edu.fudan.neocommerce.product.ProductsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequestMapping(value="/api/cart")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthService authService;

    @Autowired
    private ProductsService productsService;

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Cart getCart(@PathVariable("id") int userId, @RequestHeader("Authorization") String auth) {
        Token token = authService.getToken(auth);
        if (token == null || token.getUser().getUserInfo().getId() != userId)
            throw new UnauthorizedException();
        return token.getUser().getCart();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String addProduct(@RequestHeader("Authorization") String auth, @RequestBody OrderInfo orderInfo) {
        Token token = authService.getToken(auth);
        if (token == null) {
            throw new UnauthorizedException() ;
        }
        this.orderService.addOrder(token.getUser(), orderInfo.toOrder(productsService));
        return "null";
    }
}

class OrderInfo {
    private int userId;
    private int productId;

    public int getUserId() {
        return userId;
    }

    public int getProductId() {
        return productId;
    }

    public Order toOrder(ProductsService productsService) {
        return new Order(0, userId, productsService.get(productId));
    }
}
