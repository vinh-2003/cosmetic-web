package com.vinh.cosmetic_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CosmeticWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(CosmeticWebApplication.class, args);
	}

}
