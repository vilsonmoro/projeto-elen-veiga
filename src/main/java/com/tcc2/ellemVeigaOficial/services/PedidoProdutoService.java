package com.tcc2.ellemVeigaOficial.services;

import org.springframework.stereotype.Service;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.PedidoProduto;
import com.tcc2.ellemVeigaOficial.repositories.PedidoProdutoRepository;

@Service
public class PedidoProdutoService {
    private PedidoProdutoRepository repository;

    public PedidoProdutoService(PedidoProdutoRepository repository){
        this.repository = repository;
    }

    public PedidoProduto addPedidoProduto(PedidoProduto pedidoProduto){
        return repository.save(pedidoProduto);
    }

    public PedidoProduto findById(Long id){
        return repository.findById(id).get();
    }

    public List<PedidoProduto> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public PedidoProduto update(Long id, PedidoProduto pedidoProduto){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Relação pedido X produto não encontrada");}
        pedidoProduto.setId(id);
        return repository.save(pedidoProduto);
    }
}
