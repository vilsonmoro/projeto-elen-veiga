package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc2.ellemVeigaOficial.config.authentication.JwtTokenService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/inicio")
public class PaginaInicialController {

    private final JwtTokenService service;

    @CrossOrigin(origins = "https://localhost:8080")
    @GetMapping
    public ResponseEntity<?> paginainicial(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !service.isTokenValid(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido ou não fornecido.");
        }

        String responseMessage = "Bem-vindo à Página Inicial";
        return ResponseEntity.ok(responseMessage);
    }

}
