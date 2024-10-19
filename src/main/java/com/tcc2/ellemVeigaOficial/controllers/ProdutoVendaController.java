package com.tcc2.ellemVeigaOficial.controllers;

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
import com.tcc2.ellemVeigaOficial.models.ProdutoVenda;
import com.tcc2.ellemVeigaOficial.services.ProdutoVendaService;

@RestController
@RequestMapping("/produtovenda")
public class ProdutoVendaController {
    private ProdutoVendaService service;

    private ProdutoVendaController(ProdutoVendaService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProdutoVenda> addProdutoVenda(@RequestBody ProdutoVenda produtoVenda){
        return ResponseEntity.ok(service.addProdutoVenda(produtoVenda));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoVenda> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProdutoVenda>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
        

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoVenda> updateProdutoVenda(@PathVariable Long id, @RequestBody ProdutoVenda produtoVenda) {
        try {
            ProdutoVenda updateProdutoVenda = service.update(id, produtoVenda);
            return ResponseEntity.ok(updateProdutoVenda);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProdutoVenda(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
