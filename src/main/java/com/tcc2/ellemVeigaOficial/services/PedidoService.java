package com.tcc2.ellemVeigaOficial.services;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Pedido;
import com.tcc2.ellemVeigaOficial.repositories.PedidoRepository;

@Service
public class PedidoService {
    private PedidoRepository repository;

    public PedidoService(PedidoRepository repository){
        this.repository = repository;
    }

    public Pedido addPedido(Pedido pedido){
        return repository.save(pedido);
    }

    public Pedido findById(Long id){
        return repository.findById(id).get();
    }

    public List<Pedido> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Pedido update(Long id, Pedido pedido){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Pedido não encontrado");}
        pedido.setId(id);
        return repository.save(pedido);
    }

    public List<Pedido> buscarPedidos(Long id, Date dataInicio, Date dataFim) {
        return repository.buscarPedidos(id, dataInicio, dataFim);
    }
}