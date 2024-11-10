package com.tcc2.ellemVeigaOficial.services;

import org.springframework.stereotype.Service;
import com.tcc2.ellemVeigaOficial.models.Endereco;
import com.tcc2.ellemVeigaOficial.repositories.EnderecoRepository;
import java.util.List;

@Service
public class EnderecoService {
    private EnderecoRepository repository;

    public EnderecoService(EnderecoRepository repository){
        this.repository = repository;
    }

    public Endereco addEndereco(Endereco endereco){
        return repository.save(endereco);
    }

    public Endereco findById(Long id){
        return repository.findById(id).get();
    }

    public List<Endereco> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
    repository.deleteById(id);
    }

    public Endereco update(Long id, Endereco endereco){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Endereço não encontrado");}
        endereco.setId(id);
        return repository.save(endereco);
    }   
}