package com.tcc2.ellemVeigaOficial.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tcc2.ellemVeigaOficial.models.Venda;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Date;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long>{
       List<Venda> findByDataBetween(Date dataInicio, Date dataFim);
       
    @Query("SELECT v FROM Venda v JOIN v.cliente c WHERE " +
           "(:idVenda IS NULL OR v.id = :idVenda) AND " +
           "(:nomeCliente IS NULL OR c.nome LIKE %:nomeCliente%) AND " +
           "(:idPedido IS NULL OR v.pedido.id = :idPedido) AND " +
           "(:dataInicial IS NULL OR v.data >= :dataInicial) AND " +
           "(:dataFinal IS NULL OR v.data <= :dataFinal)")
    List<Venda> buscarVendas(@Param("idVenda") Long idVenda,
                            @Param("nomeCliente") String nomeCliente,
                            @Param("idPedido") Long idPedido,
                            @Param("dataInicial") Date dataInicial,
                            @Param("dataFinal") Date dataFinal);
}