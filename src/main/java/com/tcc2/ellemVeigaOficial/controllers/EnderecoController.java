package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Endereco;
import com.tcc2.ellemVeigaOficial.services.EnderecoService;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {
    
    @Autowired
    private EnderecoService service;

    private EnderecoController(EnderecoService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Endereco> addEndereco(@RequestBody Endereco endereco){
        return ResponseEntity.ok(service.addEndereco(endereco));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> findById(@PathVariable long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Endereco>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Endereco> updateEndereco(@PathVariable Long id, @RequestBody Endereco endereco) {
    try {
        Endereco updateEndereco = service.update(id, endereco);
        return ResponseEntity.ok(updateEndereco);
    } catch (RuntimeException e){
        return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEndereco(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}