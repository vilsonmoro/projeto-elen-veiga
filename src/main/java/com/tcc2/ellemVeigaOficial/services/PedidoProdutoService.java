package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Pedido;
import com.tcc2.ellemVeigaOficial.models.PedidoProduto;
import com.tcc2.ellemVeigaOficial.models.Produto;
import com.tcc2.ellemVeigaOficial.repositories.PedidoProdutoRepository;
import com.tcc2.ellemVeigaOficial.repositories.PedidoRepository;
import com.tcc2.ellemVeigaOficial.repositories.ProdutoRepository;

@Service
public class PedidoProdutoService {
    @Autowired
    private PedidoProdutoRepository repository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ProdutoRepository produtoRepository;

    public PedidoProduto addPedidoProduto(PedidoProduto pedidoProduto){
        if (pedidoProduto.getPedido() != null && pedidoProduto.getPedido().getId() != null) {
            Pedido pedido = pedidoRepository.findById(pedidoProduto.getPedido().getId()).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
            pedidoProduto.setPedido(pedido);
        }

        if (pedidoProduto.getProduto() != null && pedidoProduto.getProduto().getId() != null) {
            Produto produto = produtoRepository.findById(pedidoProduto.getProduto().getId()).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            pedidoProduto.setProduto(produto);
        }

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

    @Transactional
    public PedidoProduto update(Long id, PedidoProduto pedidoProduto){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Relação pedido X produto não encontrada");}
        pedidoProduto.setId(id);

        if (pedidoProduto.getPedido() != null && pedidoProduto.getPedido().getId() != null) {
            Pedido pedido = pedidoRepository.findById(pedidoProduto.getPedido().getId()).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
            pedidoProduto.setPedido(pedido);
        }
        
        if (pedidoProduto.getProduto() != null && pedidoProduto.getProduto().getId() != null) {
            Produto produto = produtoRepository.findById(pedidoProduto.getProduto().getId()).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            pedidoProduto.setProduto(produto);
        }

        return repository.save(pedidoProduto);
    }

    public List<PedidoProduto> buscarPedidoProdutos(Long codPedido, String nomeProduto) {
        return repository.buscarPedidoProdutos(codPedido, nomeProduto);
    }
}