package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import com.tcc2.ellemVeigaOficial.models.Pagamento;
import com.tcc2.ellemVeigaOficial.services.PagamentoService;
import java.util.Date;

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

    @GetMapping("/buscar")
    public ResponseEntity<List<Pagamento>> buscarPagamentos(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String nomeCliente,
            @RequestParam(required = false) Long idPedido,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataFim) {
            
        List<Pagamento> pagamentos = service.buscarPagamentos(id, nomeCliente, idPedido, dataInicio, dataFim);
        return ResponseEntity.ok(pagamentos);
    }
}