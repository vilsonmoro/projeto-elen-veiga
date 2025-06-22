package com.tcc2.ellemVeigaOficial.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class TipoEntregaDTO {
    private final String nome;
    private final String descricao;
    
	public String getNome() {
		return nome;
	}
	public String getDescricao() {
		return descricao;
	}
	public TipoEntregaDTO(String nome, String descricao) {
		this.nome = nome;
		this.descricao = descricao;
	}
    
    
}