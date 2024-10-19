package com.tcc2.ellemVeigaOficial.services;

import org.springframework.stereotype.Service;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Venda;
import com.tcc2.ellemVeigaOficial.repositories.VendaRepository;

@Service
public class VendaService {
    private VendaRepository repository;

    public VendaService(VendaRepository repository){
        this.repository = repository;
    }

    public Venda addVenda(Venda venda){
        return repository.save(venda);
    }

    public Venda findById(Long id){
        return repository.findById(id).get();
    }

    public List<Venda> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Venda update(Long id, Venda venda){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Venda não encontrado");}
        venda.setId(id);
        return repository.save(venda);
    }
}
