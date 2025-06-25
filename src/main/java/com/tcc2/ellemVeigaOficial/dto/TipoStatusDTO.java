package com.tcc2.ellemVeigaOficial.dto;

public class TipoStatusDTO {
	private String nome;
	private String descricao;

	public String getNome() {
		return nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public TipoStatusDTO(String nome, String descricao) {
		super();
		this.nome = nome;
		this.descricao = descricao;
	}
}