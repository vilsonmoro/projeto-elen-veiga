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
public class PedidoProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_pp")
    private long id;
	
	@Column(name = "qtd_pp", nullable = false, length = 100)
    private int quatidade;

	@Column(name = "valor_pp", length = 100)
    private Float valor_total;

	@Column(name = "observacao_pp", length = 100)
    private String observacao;

    @Column(name = "tamanho_pp", nullable = false, length = 100)
    private String tamanho;
    
    @Column(name = "desconto_pp", length = 100)
    private Float desconto;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "codpro_pp", nullable = false)
    private Produto produto;
    
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "codped_pp", nullable = false)
	private Pedido pedido;
}