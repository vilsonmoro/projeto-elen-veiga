package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Pedido;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.repositories.ClienteRepository;
import com.tcc2.ellemVeigaOficial.repositories.PedidoRepository;
import com.tcc2.ellemVeigaOficial.repositories.UsuarioRepository;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    /*
     * public Pedido addPedido(Pedido pedido){
     * if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
     * Usuario usuario =
     * usuarioRepository.findById(pedido.getUsuario().getId()).orElseThrow(() -> new
     * RuntimeException("Usuário não encontrado"));
     * pedido.setUsuario(usuario);
     * }
     * 
     * return repository.save(pedido);
     * }
     */

    public Pedido salvar(Pedido pedido) {
        if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
            pedido.setUsuario(usuarioRepository.findById(pedido.getUsuario().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado")));
        }

        if (pedido.getCliente() != null && pedido.getCliente().getId() != null) {
            pedido.setCliente(clienteRepository.findById(pedido.getCliente().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado")));
        }

        return pedidoRepository.save(pedido);
    }

    public Pedido findById(Long id) {
        return pedidoRepository.findById(id).get();
    }

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    public void delete(Long id) {
        pedidoRepository.deleteById(id);
    }

    public Pedido update(Long id, Pedido pedido) {
        if (!pedidoRepository.existsById(id)) {
            throw new RuntimeException("Pedido não encontrado");
        }
        pedido.setId(id);

        if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(pedido.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            pedido.setUsuario(usuario);
        }

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> buscarPedidos(Long id, Date dataInicio, Date dataFim) {
        return pedidoRepository.buscarPedidos(id, dataInicio, dataFim);
    }
}
