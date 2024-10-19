package com.tcc2.ellemVeigaOficial.services;

import org.springframework.stereotype.Service;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Produto;
import com.tcc2.ellemVeigaOficial.repositories.ProdutoRepository;

@Service
public class ProdutoService {
    private ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository){
        this.repository = repository;
    }

    public Produto addProduto(Produto produto){
        return repository.save(produto);
    }

    public Produto findById(Long id){
        return repository.findById(id).get();
    }

    public List<Produto> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Produto update(Long id, Produto produto){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado");}
        produto.setId(id);
        return repository.save(produto);
    }
}
