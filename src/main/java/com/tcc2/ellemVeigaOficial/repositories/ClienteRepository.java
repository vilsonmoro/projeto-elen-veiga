package com.tcc2.ellemVeigaOficial.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.tcc2.ellemVeigaOficial.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    Optional<Cliente> findById(Long id);
    List<Cliente> findByNome(String nome);
}


