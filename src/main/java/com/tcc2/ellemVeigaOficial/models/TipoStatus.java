package com.tcc2.ellemVeigaOficial.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TipoStatus {
    ATIVO("Ativo"),
    DESATIVADO("Desativado"),
    APROVADO("Aprovado"),
    AGUARDANDO_APROVACAO("Aguardando Aprovação"),
    REPROVADO("Reprovado");

    private final String descricao;
}
