package edu.fudan.neocommerce.order;

import edu.fudan.neocommerce.auth.AuthService;
import edu.fudan.neocommerce.auth.Token;
import edu.fudan.neocommerce.exception.UnauthorizedException;
import edu.fudan.neocommerce.product.Product;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequestMapping(value="/api/cart")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    AuthService authService;

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Cart getCart(@PathVariable("id") int userId, @RequestHeader("Authority")String auth) {
        checkUser(auth, userId);
        return orderService.getCart(userId);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public void addProduct(@RequestHeader("Authority") String auth, @RequestBody()Product product) {
        int userId = getUserId(auth);
        this.orderService.addOrder(userId, product);
    }

    private void checkUser(String auth, int userId) {
        Token token = authService.getToken(auth);
        if (token == null || token.getUser().getUserInfo().getId() != userId)
            throw new UnauthorizedException();
    }

    private int getUserId(String auth) {
        Token token = authService.getToken(auth);
        if (token == null) {
            throw new UnauthorizedException() ;
        }
        return token.getUser().getUserInfo().getId();
    }
}