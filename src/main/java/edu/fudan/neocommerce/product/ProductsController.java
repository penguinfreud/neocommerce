package edu.fudan.neocommerce.product;

import edu.fudan.neocommerce.auth.AuthService;
import edu.fudan.neocommerce.auth.Token;
import edu.fudan.neocommerce.auth.UserInfo;
import edu.fudan.neocommerce.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by wsy on 6/12/17.
 */
@Controller
@RequestMapping("/api/products")
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    @Autowired
    private AuthService authService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Collection<Product> getAll() {
        return productsService.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Product get(@PathVariable("id") int id) {
        return productsService.get(id);
    }

    private void checkAdmin(String auth) {
        Token token = authService.getToken(auth);
        if (token == null || token.getUser().getUserInfo().getType() != UserInfo.ROLE_ADMIN)
            throw new UnauthorizedException();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public int add(@RequestHeader("Authority") String auth, @RequestBody Product product) {
        checkAdmin(auth);
        return productsService.add(product);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String remove(@RequestHeader("Authority") String auth, @PathVariable("id") int id) {
        checkAdmin(auth);
        productsService.remove(id);
        return "null";
    }
}
