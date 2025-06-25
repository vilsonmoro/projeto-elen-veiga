package com.tcc2.ellemVeigaOficial.models;

import lombok.Getter;

@Getter
public enum TipoEntrega {
    CARRO("Carro"),
    SEDEX("SEDEX"),
    RETIRADA("Retirada"),
    TRANSPORTADORA("Transportadora");

    private final String descricao;

    public String getDescricao() {
        return descricao;
    }

    @Override
    public String toString() {
        return descricao;
    }

     private TipoEntrega(String descricao) {
        this.descricao = descricao;
    }
}
