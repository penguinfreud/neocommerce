package edu.fudan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NeocommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NeocommerceApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner()
}
