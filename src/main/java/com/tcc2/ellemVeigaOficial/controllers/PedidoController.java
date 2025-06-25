package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import java.util.Date;
import com.tcc2.ellemVeigaOficial.models.Pedido;
import com.tcc2.ellemVeigaOficial.services.PedidoService;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin
@Tag(name = "Pedido", description = "Operações relacionadas a Pedido")
public class PedidoController {
    @Autowired
    private PedidoService service;

    @PostMapping("/pedido")
    public ResponseEntity<Pedido> addPedido(@RequestBody Pedido pedido) {
        Pedido salvo = service.addPedido(pedido);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/pedido/{id}")
    public ResponseEntity<Pedido> findById(@PathVariable long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/pedido")
    public ResponseEntity<List<Pedido>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/pedido/{id}")
    public ResponseEntity<Pedido> updatePedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        return ResponseEntity.ok(service.update(id, pedido));
    }
    
    @DeleteMapping("/pedido/{id}")
    public ResponseEntity<?> deletePedido(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pedido/buscar")
    public ResponseEntity<List<Pedido>> buscarPedidos(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataFim) {
        List<Pedido> pedidos = service.buscarPedidos(id, dataInicio, dataFim);
        return ResponseEntity.ok(pedidos);
    }
}