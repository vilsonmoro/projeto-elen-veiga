package com.tcc2.ellemVeigaOficial.models;

import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ProdutoVenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_pv")
    private Long id;
	@Column(name = "qtd_pv", nullable = false, length = 100)
    private int quantidade;
	@Column(name = "tamanho_pv", nullable = false, length = 100)
    private String tamanho;
	@Column(name = "desconto_pv", length = 100)
    private Float desconto;
	@Column(name = "observacao_pv", length = 100)
	private String observacao;

	@Column(name = "valortot_pv", length = 100)
    private Double valorTotal;
	@Column(name = "valoruni_pv", length = 100)
    private Float valorUnitario;
	@Column(name = "nome_pv", nullable = false, length = 100)
    private String nome;

	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codpro_pv", nullable = false)
    private Produto produto;
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codven_pv", nullable = false)
    private Venda venda;

	public ProdutoVenda(Long id, int quantidade, String tamanho, Float desconto, String observacao, Double valorTotal,
			Float valorUnitario, String nome, Produto produto, Venda venda) {
		this.id = id;
		this.quantidade = quantidade;
		this.tamanho = tamanho;
		this.desconto = desconto;
		this.observacao = observacao;
		this.valorTotal = valorTotal;
		this.valorUnitario = valorUnitario;
		this.nome = nome;
		this.produto = produto;
		this.venda = venda;
	}

	public ProdutoVenda() {
	}

	public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }

    public String getTamanho() { return tamanho; }
    public void setTamanho(String tamanho) { this.tamanho = tamanho; }

    public Float getDesconto() { return desconto; }
    public void setDesconto(Float desconto) { this.desconto = desconto; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }

    public Double getValorTotal() { return valorTotal; }
    public void setValorTotal(Double valorTotal) { this.valorTotal = valorTotal; }

    public Float getValorUnitario() { return valorUnitario; }
    public void setValorUnitario(Float valorUnitario) { this.valorUnitario = valorUnitario; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }

    public Venda getVenda() { return venda; }
    public void setVenda(Venda venda) { this.venda = venda; }

    // equals e hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProdutoVenda)) return false;
        ProdutoVenda that = (ProdutoVenda) o;
        return quantidade == that.quantidade &&
                Objects.equals(id, that.id) &&
                Objects.equals(tamanho, that.tamanho) &&
                Objects.equals(desconto, that.desconto) &&
                Objects.equals(observacao, that.observacao) &&
                Objects.equals(valorTotal, that.valorTotal) &&
                Objects.equals(valorUnitario, that.valorUnitario) &&
                Objects.equals(nome, that.nome) &&
                Objects.equals(produto, that.produto) &&
                Objects.equals(venda, that.venda);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, quantidade, tamanho, desconto, observacao, valorTotal, valorUnitario, nome, produto, venda);
    }

    // toString
    @Override
    public String toString() {
        return "ProdutoVenda{" +
                "id=" + id +
                ", quantidade=" + quantidade +
                ", tamanho='" + tamanho + '\'' +
                ", desconto=" + desconto +
                ", observacao='" + observacao + '\'' +
                ", valorTotal=" + valorTotal +
                ", valorUnitario=" + valorUnitario +
                ", nome='" + nome + '\'' +
                ", produto=" + produto +
                ", venda=" + venda +
                '}';
    }
}