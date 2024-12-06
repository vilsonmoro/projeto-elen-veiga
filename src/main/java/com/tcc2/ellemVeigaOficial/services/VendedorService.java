package com.tcc2.ellemVeigaOficial.services;

import org.springframework.stereotype.Service;
import java.util.List;

import com.tcc2.ellemVeigaOficial.models.TipoStatus;
import com.tcc2.ellemVeigaOficial.models.Vendedor;
import com.tcc2.ellemVeigaOficial.repositories.VendedorRepository;

@Service
public class VendedorService {
    private VendedorRepository repository;

    public VendedorService(VendedorRepository repository){
        this.repository = repository;
    }

    public Vendedor addVendedor(Vendedor vendedor){
        return repository.save(vendedor);
    }

    public Vendedor findById(Long id){
        return repository.findById(id).get();
    }

    public List<Vendedor> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Vendedor update(Long id, Vendedor vendedor){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Vendedor não encontrado");}
        vendedor.setId(id);
        return repository.save(vendedor);
    }

    public List<Vendedor> buscarVendedores(Long id, String nome, String sobrenome, TipoStatus status) {
        return repository.buscarVendedores(id, nome, sobrenome, status);
    }

}
