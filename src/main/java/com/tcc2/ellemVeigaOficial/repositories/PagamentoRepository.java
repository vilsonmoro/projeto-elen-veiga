package com.tcc2.ellemVeigaOficial.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.tcc2.ellemVeigaOficial.models.Pagamento;
import java.util.List;
import java.util.Date;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long>{
       
    @Query("SELECT p FROM Pagamento p WHERE " +
           "(:codigo IS NULL OR p.id = :codigo) AND " + 
           "(:nomeCliente IS NULL OR p.cliente.nome LIKE %:nomeCliente%) AND " + 
           "(:codigoPedido IS NULL OR p.pedido.id = :codigoPedido) AND " + 
           "(:startDate IS NULL OR p.data BETWEEN :startDate AND :endDate)")
    List<Pagamento> buscarPagamentos(@Param("codigo") Long codigo,
                                    @Param("nomeCliente") String nomeCliente,
                                    @Param("codigoPedido") Long codigoPedido,
                                    @Param("startDate") Date startDate,
                                    @Param("endDate") Date endDate); 
}