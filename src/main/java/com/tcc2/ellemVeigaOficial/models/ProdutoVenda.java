package com.tcc2.ellemVeigaOficial.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class ProdutoVenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_pv")
    private long id;
	@Column(name = "qtd_pv", nullable = false, length = 100)
    private int quatidade;
	@Column(name = "tamanho_pv", nullable = false, length = 100)
    private String tamanho;
	@Column(name = "desconto_pv", length = 100)
    private Float desconto;
	@Column(name = "valor_pv", length = 100)
    private Float valor_total;
	@Column(name = "observacao_pv", length = 100)
	private String observacao;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "codpro_pv", nullable = false)
    private Produto produto;
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "codven_pv", nullable = false)
    private Venda venda;
}