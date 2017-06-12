package edu.fudan.neocommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration(exclude = SecurityAutoConfiguration.class)
@ComponentScan(basePackages = "edu.fudan.neocommerce")
public class NeocommerceApplication {
	public static void main(String[] args) {
		SpringApplication.run(NeocommerceApplication.class, args);
	}
}
