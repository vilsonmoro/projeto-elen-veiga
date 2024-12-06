package com.tcc2.ellemVeigaOficial.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TipoEntrega {
    CARRO("Carro"),
    SEDEX("SEDEX"),
    PAC("PAC"),
    TRANSPORTADORA("Transportadora");

    private final String descricao;
}
