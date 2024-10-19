package com.tcc2.ellemVeigaOficial.services;

import org.springframework.stereotype.Service;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.ProdutoVenda;
import com.tcc2.ellemVeigaOficial.repositories.ProdutoVendaRepository;

@Service
public class ProdutoVendaService {
    private ProdutoVendaRepository repository;

    public ProdutoVendaService(ProdutoVendaRepository repository){
        this.repository = repository;
    }

    public ProdutoVenda addProdutoVenda(ProdutoVenda produtoVenda){
        return repository.save(produtoVenda);
    }

    public ProdutoVenda findById(Long id){
        return repository.findById(id).get();
    }

    public List<ProdutoVenda> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public ProdutoVenda update(Long id, ProdutoVenda produtoVenda){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Relação produto X venda não encontrada");}
        produtoVenda.setId(id);
        return repository.save(produtoVenda);
    }
}
