package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.tcc2.ellemVeigaOficial.models.Login;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.services.UsuarioService;

import lombok.AllArgsConstructor;

@RequestMapping("/login")
@RestController
@AllArgsConstructor
public class LoginController {

    @Autowired
    private UsuarioService service;

    @PostMapping
    public ResponseEntity<Usuario> login(@RequestBody Login login) {
        Usuario usuario = service.login(login.getUsuario(), login.getSenha());
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/validarsenha")
    public ResponseEntity<Boolean> validarSenha(@RequestParam String senha, @RequestParam String usuario) {
        Usuario usu = service.findByUsuario(usuario);
        boolean isValid = service.checkPassword(senha, usu.getSenha());
        return ResponseEntity.ok(isValid);
    }
    
}
