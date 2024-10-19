package com.tcc2.ellemVeigaOficial.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tcc2.ellemVeigaOficial.models.Venda;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long>{

}
