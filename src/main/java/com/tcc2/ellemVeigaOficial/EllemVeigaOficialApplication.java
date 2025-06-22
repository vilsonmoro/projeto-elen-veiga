package com.tcc2.ellemVeigaOficial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "models")
@ComponentScan(basePackages = {"controllers", "models", "services","repositories","config"})
@EnableJpaRepositories(basePackages = "repositories")
public class EllemVeigaOficialApplication {
	public static void main(String[] args) {
		SpringApplication.run(EllemVeigaOficialApplication.class, args);
	
	}
} 