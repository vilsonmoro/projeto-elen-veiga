package com.tcc2.ellemVeigaOficial.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.PedidoProduto;

@Repository
public interface PedidoProdutoRepository extends JpaRepository<PedidoProduto, Long> {
    @Query("SELECT pp FROM PedidoProduto pp WHERE " +
           "(:codPedido IS NULL OR pp.pedido.id = :codPedido) AND " +
           "(:nomeProduto IS NULL OR pp.produto.nome LIKE %:nomeProduto%)")
    List<PedidoProduto> buscarPedidoProdutos(@Param("codPedido") Long codPedido,
                                           @Param("nomeProduto") String nomeProduto);
}