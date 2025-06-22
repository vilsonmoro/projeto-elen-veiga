package com.tcc2.ellemVeigaOficial.config.authentication;

import java.util.List;

public class PublicEndpoints {
    public static final List<String> ENDPOINTS = List.of(
	    
	        "/css/**",
	        "/js/**",
	        "/images/**",
	        "/favicon.ico",
	        "/",
	        "/login",
	        "/cadastrousuario",
	        "/usuario/**",
	        "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**"
	    );

}
