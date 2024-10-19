package com.tcc2.ellemVeigaOficial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class EllemVeigaOficialApplication {
	public static void main(String[] args) {
		SpringApplication.run(EllemVeigaOficialApplication.class, args);
	
	}

}
