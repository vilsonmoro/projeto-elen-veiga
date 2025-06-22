package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.PedidoProduto;
import com.tcc2.ellemVeigaOficial.services.PedidoProdutoService;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@CrossOrigin
@Tag(name = "Relacionamento Pedido X Produto", description = "Operações relacionadas aos produtos de um pedido")
public class PedidoProdutoController {
    private PedidoProdutoService service;

    @PostMapping("/pedidoproduto")
        public ResponseEntity<List<PedidoProduto>> addPedidoProdutos(@RequestBody List<PedidoProduto> pedidoProdutos){
            return ResponseEntity.ok(service.addPedidoProdutos(pedidoProdutos));
        }


    @GetMapping("/pedidoproduto/{id}")
    public ResponseEntity<PedidoProduto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/pedidoproduto")
    public ResponseEntity<List<PedidoProduto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/pedidoproduto/{id}")
    public ResponseEntity<PedidoProduto> updatePedidoProduto(@PathVariable Long id, @RequestBody PedidoProduto pedidoProduto) {
        try {
            PedidoProduto updatePedidoProduto = service.update(id, pedidoProduto);
            return ResponseEntity.ok(updatePedidoProduto);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/pedidoproduto")
    public ResponseEntity<List<PedidoProduto>> updatePedidoProdutos(@RequestBody List<PedidoProduto> pedidoProdutos) {
        try {
            List<PedidoProduto> updatedList = service.updatePedidoProdutos(pedidoProdutos);
            return ResponseEntity.ok(updatedList);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/pedidoproduto/{id}")
    public ResponseEntity<Void> deletePedidoProduto(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pedidoproduto/buscar")
    public ResponseEntity<List<PedidoProduto>> buscarPedidoProdutos(
            @RequestParam(required = false) Long codPedido,
            @RequestParam(required = false) String nomeProduto) {
        List<PedidoProduto> pedidosProdutos = service.buscarPedidoProdutos(codPedido, nomeProduto);
        return ResponseEntity.ok(pedidosProdutos);
    }

    @GetMapping("/pedidoproduto/pedido/{pedidoId}")
    public List<PedidoProduto> getByPedidoId(@PathVariable Long pedidoId) {
        return service.findByPedidoId(pedidoId);
    }
}