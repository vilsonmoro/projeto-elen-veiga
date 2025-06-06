package com.tcc2.ellemVeigaOficial.models;

import com.fasterxml.jackson.annotation.JsonCreator;

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

    @JsonCreator
    public static TipoStatus fromString(String value) {
        switch (value.toUpperCase()) {
            case "DESATIVADO":
                return DESATIVADO;
            case "ATIVO":
                return ATIVO;
            case "REPROVADO":
                return REPROVADO;
            case "APROVADO":
                return APROVADO;
            case "AGUARDANDO_APROVACAO":
                return AGUARDANDO_APROVACAO;
            default:
                throw new IllegalArgumentException("Valor inválido para o Enum TipoStatus: " + value);
        }
    }
}
