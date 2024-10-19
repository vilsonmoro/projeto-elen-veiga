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
import com.tcc2.ellemVeigaOficial.models.Pagamento;
import com.tcc2.ellemVeigaOficial.services.PagamentoService;

@RestController
@RequestMapping("/pagamento")
public class PagamentoController {
     @Autowired
    private PagamentoService service;

    private PagamentoController(PagamentoService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Pagamento> addPagamento(@RequestBody Pagamento pagamento){
        return ResponseEntity.ok(service.addPagamento(pagamento));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> findById(@PathVariable long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Pagamento>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pagamento> updatePagamento(@PathVariable Long id, @RequestBody Pagamento pagamento) {
        try {
            Pagamento updatePagamento = service.update(id, pagamento);
            return ResponseEntity.ok(updatePagamento);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePagamento(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
