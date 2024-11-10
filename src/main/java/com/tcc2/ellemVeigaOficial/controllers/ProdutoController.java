package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Produto;
import com.tcc2.ellemVeigaOficial.services.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
    private ProdutoService service;

    private ProdutoController(ProdutoService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Produto> addProduto(@RequestBody Produto produto){
        return ResponseEntity.ok(service.addProduto(produto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Produto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto) {
        try {
            Produto updateProduto = service.update(id, produto);
            return ResponseEntity.ok(updateProduto);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Produto>> buscarProdutos(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String nome) {
        List<Produto> produtos = service.buscarProdutos(id, nome);
        return ResponseEntity.ok(produtos);
    }
}
