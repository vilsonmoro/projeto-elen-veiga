package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Cliente;
import com.tcc2.ellemVeigaOficial.repositories.ClienteRepository;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

    public List<Cliente> findAll(){
        return repository.findAll();
    }

    public Cliente findById(Long id){
        return repository.findById(id).get();
    }

    public Cliente addCliente(Cliente cliente){
        return repository.save(cliente);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Cliente update(Long id, Cliente cliente){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado");}
        cliente.setId(id);
        return repository.save(cliente);
    }

    public ClienteService(ClienteRepository repository){
        this.repository = repository;
    }   
}
