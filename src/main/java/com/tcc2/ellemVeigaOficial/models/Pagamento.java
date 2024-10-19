package com.tcc2.ellemVeigaOficial.models;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_pag")
    private Long id;
	@Column(name = "data_pag", nullable = false, length = 255)
    private Date data;
	@Column(name = "valor_pag", nullable = false, length = 255)
    private Float valor;
	@Column(name = "parcela_pag", nullable = false, length = 255)
    private int parcela;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "codcli_pag")
    private Cliente cliente;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "codped_pag")
    private Pedido pedido;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "codven_pag")
    private Venda venda;
	
    @Enumerated(EnumType.STRING)
	@Column(name = "forpag_pag", length = 25)
    private FormaPagamento forma_pagamento;
}
