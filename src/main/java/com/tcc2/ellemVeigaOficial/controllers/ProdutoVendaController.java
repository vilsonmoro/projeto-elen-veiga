package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.Calendar;
import java.util.List;
import java.util.Date;
import com.tcc2.ellemVeigaOficial.dto.VendasPorProdutoDTO;
import com.tcc2.ellemVeigaOficial.models.ProdutoVenda;
import com.tcc2.ellemVeigaOficial.services.ProdutoVendaService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin
@Tag(name = "Relacionamento Venda X Produto", description = "Operações relacionadas aos produtos de uma venda")
public class ProdutoVendaController {
    @Autowired
	private ProdutoVendaService service;

    @PostMapping("/produtovenda")
    public ResponseEntity<?> addProdutoVendas(@RequestBody List<ProdutoVenda> produtosVenda) {
        List<ProdutoVenda> salvos = service.addProdutoVendas(produtosVenda);
        return ResponseEntity.ok(salvos); // ou uma mensagem se preferir
    }

    @GetMapping("/produtovenda/{id}")
    public ResponseEntity<ProdutoVenda> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/produtovenda")
    public ResponseEntity<List<ProdutoVenda>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/produtovenda/{id}")
    public ResponseEntity<ProdutoVenda> updateProdutoVenda(@PathVariable Long id, @RequestBody ProdutoVenda produtoVenda) {
        try {
            ProdutoVenda updateProdutoVenda = service.update(id, produtoVenda);
            return ResponseEntity.ok(updateProdutoVenda);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/produtovenda")
    public ResponseEntity<List<ProdutoVenda>> updateProdutoVendas(@RequestBody List<ProdutoVenda> produtosVenda) {
        try {
            List<ProdutoVenda> atualizados = service.updateProdutosVenda(produtosVenda);
            return ResponseEntity.ok(atualizados);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/produtovenda/{id}")
    public ResponseEntity<Void> deleteProdutoVenda(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/produtovenda/buscar")
    public ResponseEntity<List<ProdutoVenda>> buscarProdutoVendas(
            @RequestParam(required = false) Long idVenda,
            @RequestParam(required = false) String nomeProduto) {
        List<ProdutoVenda> produtoVendas = service.buscarProdutoVendas(idVenda, nomeProduto);
        return ResponseEntity.ok(produtoVendas);
    }

    @GetMapping("/produtovenda/vendasmes")
    public ResponseEntity<List<VendasPorProdutoDTO>> vendasDoMes() {
    	
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH, 1);
        Date primeiroDia = cal.getTime();
        
        System.out.println(primeiroDia);

        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        Date ultimoDia = cal.getTime();

        List<VendasPorProdutoDTO> vendas = service.buscarVendasPorProdutoNoPeriodo(primeiroDia, ultimoDia);
        return ResponseEntity.ok(vendas);
    }

}