package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.tcc2.ellemVeigaOficial.config.security.RecoveryJwtTokenDto;
import com.tcc2.ellemVeigaOficial.models.Login;
import com.tcc2.ellemVeigaOficial.services.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Login", description = "Operações relacionadas ao login")
public class LoginController {

    @Autowired
    private UsuarioService service;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Object> authenticateUser(@RequestBody Login loginUserDto) {
        try {
        	RecoveryJwtTokenDto token = service.authenticateUser(loginUserDto);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
}