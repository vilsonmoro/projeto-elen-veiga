package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.tcc2.ellemVeigaOficial.models.Cliente;
import com.tcc2.ellemVeigaOficial.models.Endereco;
import com.tcc2.ellemVeigaOficial.models.Pagamento;
import com.tcc2.ellemVeigaOficial.models.Pedido;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.models.Venda;
import com.tcc2.ellemVeigaOficial.repositories.ClienteRepository;
import com.tcc2.ellemVeigaOficial.repositories.PagamentoRepository;
import com.tcc2.ellemVeigaOficial.repositories.PedidoRepository;
import com.tcc2.ellemVeigaOficial.repositories.VendaRepository;

import java.util.Date;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoRepository repository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private VendaRepository vendaRepository;

    public Pagamento addPagamento(Pagamento pagamento){
        if (pagamento.getCliente() != null && pagamento.getCliente().getId() != null){
            Cliente cliente = clienteRepository.findById(pagamento.getCliente().getId()).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            pagamento.setCliente(cliente);
        }

        if (pagamento.getPedido() != null && pagamento.getPedido().getId() != null){
            Pedido pedido = pedidoRepository.findById(pagamento.getPedido().getId()).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
            pagamento.setPedido(pedido);
        }

        if (pagamento.getVenda() != null && pagamento.getVenda().getId() != null){
            Venda venda = vendaRepository.findById(pagamento.getVenda().getId()).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
            pagamento.setVenda(venda);
        }

        return repository.save(pagamento);
    }

    public Pagamento findById(Long id){
        return repository.findById(id).get();
    }

    public List<Pagamento> findAll(){
        return repository.findAll();
    }


    public void delete(Long id){
        repository.deleteById(id);
    }

    @Transactional
    public Pagamento update(Long id, Pagamento pagamento){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Pagamento não encontrado");}
        pagamento.setId(id);

        if (pagamento.getCliente() != null && pagamento.getCliente().getId() != null){
            Cliente cliente = clienteRepository.findById(pagamento.getCliente().getId()).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            pagamento.setCliente(cliente);
        }

        if (pagamento.getPedido() != null && pagamento.getPedido().getId() != null){
            Pedido pedido = pedidoRepository.findById(pagamento.getPedido().getId()).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
            pagamento.setPedido(pedido);
        }

        if (pagamento.getVenda() != null && pagamento.getVenda().getId() != null){
            Venda venda = vendaRepository.findById(pagamento.getVenda().getId()).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
            pagamento.setVenda(venda);
        } 
        
        return repository.save(pagamento);
    }

    public List<Pagamento> buscarPagamentos(Long codigo, String nomeCliente, Long codigoPedido, Date startDate, Date endDate) {   
        return repository.buscarPagamentos(codigo, nomeCliente, codigoPedido, startDate, endDate);
    }    
}
