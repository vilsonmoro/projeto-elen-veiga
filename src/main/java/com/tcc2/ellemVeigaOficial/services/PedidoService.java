package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Pedido;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.repositories.ClienteRepository;
import com.tcc2.ellemVeigaOficial.repositories.PedidoProdutoRepository;
import com.tcc2.ellemVeigaOficial.repositories.PedidoRepository;
import com.tcc2.ellemVeigaOficial.repositories.UsuarioRepository;
import com.tcc2.ellemVeigaOficial.repositories.VendaRepository;
import com.tcc2.ellemVeigaOficial.tratamentoerros.ClienteNaoEncontradoException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.EntidadeRelacionadaException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.PedidoNaoEncontradoException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.UsuarioNaoEncontradoException;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private PedidoProdutoRepository pedidoProdutoRepository;
    @Autowired
    private VendaRepository vendaRepository;

    @Transactional
    public Pedido addPedido(Pedido pedido) {
        if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
            pedido.setUsuario(usuarioRepository.findById(pedido.getUsuario().getId())
                    .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado")));
        }

        if (pedido.getCliente() != null && pedido.getCliente().getId() != null) {
            Long clienteId = pedido.getCliente().getId();
            if (clienteId > 0) {
                pedido.setCliente(clienteRepository.findById(clienteId)
                        .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente não encontrado")));
            } else {
                pedido.setCliente(null); // ID inválido, ignora
            }
        } else {
            pedido.setCliente(null); // Cliente ausente, ignora
        }

        return pedidoRepository.save(pedido);
    }


    public Pedido findById(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoNaoEncontradoException("Pedido com ID " + id + " não encontrado"));
    }

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    @Transactional
    public void delete(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new PedidoNaoEncontradoException("Pedido com ID " + id + " não encontrado"));

         if (vendaRepository.existsByPedido(pedido)) {
            throw new EntidadeRelacionadaException("Não é possível excluir o pedido. Há uma venda vinculada a ele.");
        }

        pedidoProdutoRepository.deleteByPedido(pedido);
        pedidoRepository.deleteById(id);
    }

    public Pedido update(Long id, Pedido pedido) {
        if (!pedidoRepository.existsById(id)) {
            throw new PedidoNaoEncontradoException("Pedido com ID " + id + " não encontrado");
        }
        pedido.setId(id);

        if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(pedido.getUsuario().getId())
                    .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário com ID " + pedido.getUsuario().getId() + " não encontrado"));
            pedido.setUsuario(usuario);
        }

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> buscarPedidos(Long id, Date dataInicio, Date dataFim) {
    	return pedidoRepository.buscarPedidos(id, dataInicio, dataFim);
    }
}
