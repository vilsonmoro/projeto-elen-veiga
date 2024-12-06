package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Pedido;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.repositories.PedidoRepository;
import com.tcc2.ellemVeigaOficial.repositories.UsuarioRepository;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository repository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Pedido addPedido(Pedido pedido){
        if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(pedido.getUsuario().getId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            pedido.setUsuario(usuario);
        }

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

        if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(pedido.getUsuario().getId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            pedido.setUsuario(usuario);
        }

        return repository.save(pedido);
    }

    public List<Pedido> buscarPedidos(Long id, Date dataInicio, Date dataFim) {
        return repository.buscarPedidos(id, dataInicio, dataFim);
    }
}