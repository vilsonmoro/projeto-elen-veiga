package com.tcc2.ellemVeigaOficial.models;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FluxoCaixa {
    private LocalDate data;
    private Long idProduto;
    private Long idVenda;
    private Float desconto;
    private Float valor;
    private String tipo; // "entrada" ou "saida"
}
