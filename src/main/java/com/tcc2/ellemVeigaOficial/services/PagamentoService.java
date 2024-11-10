package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Pagamento;
import com.tcc2.ellemVeigaOficial.repositories.PagamentoRepository;
import java.util.Date;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoRepository repository;

    public PagamentoService(PagamentoRepository repository){
        this.repository = repository;
    }

    public Pagamento addPagamento(Pagamento pagamento){
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

    public Pagamento update(Long id, Pagamento pagamento){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Pagamento não encontrado");}
        pagamento.setId(id);
        return repository.save(pagamento);
    }

    public List<Pagamento> buscarPagamentos(Long codigo, String nomeCliente, Long codigoPedido, Date startDate, Date endDate) {   
        return repository.findPagamentos(codigo, nomeCliente, codigoPedido, startDate, endDate);
    }    
}