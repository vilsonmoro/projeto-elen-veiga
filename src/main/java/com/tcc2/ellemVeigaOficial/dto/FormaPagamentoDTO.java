package com.tcc2.ellemVeigaOficial.dto;

public class FormaPagamentoDTO {
	private  String nome;
	private  String descricao;

	public String getNome() {
		return nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public FormaPagamentoDTO(String nome, String descricao) {
		this.nome = nome;
		this.descricao = descricao;
	}

}