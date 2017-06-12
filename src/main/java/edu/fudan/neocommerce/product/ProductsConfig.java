package edu.fudan.neocommerce.product;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by wsy on 6/12/17.
 */
@Configuration
public class ProductsConfig {
    @Bean
    public ProductsService productsService() {
        return new ProductsService();
    }
}
