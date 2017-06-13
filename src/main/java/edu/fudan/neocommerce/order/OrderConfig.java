package edu.fudan.neocommerce.order;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by 11206 on 2017/6/13.
 */
@Configuration
public class OrderConfig {
    @Bean
    public OrderService orderService() {
        return new OrderService();
    }
}
