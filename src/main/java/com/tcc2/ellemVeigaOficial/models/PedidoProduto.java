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
public class PedidoProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_pp")
    private Long id;
	
	@Column(name = "qtd_pp", nullable = false, length = 100)
    private int quantidade;

	@Column(name = "observacao_pp", length = 100)
    private String observacao;

    @Column(name = "nome_pp", length = 100)
    private String nome;

    @Column(name = "tamanho_pp", nullable = false, length = 100)
    private String tamanho;
    
    @Column(name = "desconto_pp", length = 100)
    private Float desconto;

    @Column(name = "valortot_pp", length = 100)
    private Float valor_total;

    @Column(name = "valoruni_pp", length = 100)
    private Float valor_unitario;

	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codpro_pp", nullable = false)
    private Produto produto;
    
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codped_pp", nullable = false)
	private Pedido pedido;

    public PedidoProduto(Long id, int quantidade, String observacao, String nome, String tamanho, Float desconto,
            Float valor_total, Float valor_unitario, Produto produto, Pedido pedido) {
        this.id = id;
        this.quantidade = quantidade;
        this.observacao = observacao;
        this.nome = nome;
        this.tamanho = tamanho;
        this.desconto = desconto;
        this.valor_total = valor_total;
        this.valor_unitario = valor_unitario;
        this.produto = produto;
        this.pedido = pedido;
    }

    public PedidoProduto() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTamanho() { return tamanho; }
    public void setTamanho(String tamanho) { this.tamanho = tamanho; }

    public Float getDesconto() { return desconto; }
    public void setDesconto(Float desconto) { this.desconto = desconto; }

    public Float getValor_total() { return valor_total; }
    public void setValor_total(Float valor_total) { this.valor_total = valor_total; }

    public Float getValor_unitario() { return valor_unitario; }
    public void setValor_unitario(Float valor_unitario) { this.valor_unitario = valor_unitario; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    // equals e hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PedidoProduto)) return false;
        PedidoProduto that = (PedidoProduto) o;
        return quantidade == that.quantidade &&
                Objects.equals(id, that.id) &&
                Objects.equals(observacao, that.observacao) &&
                Objects.equals(nome, that.nome) &&
                Objects.equals(tamanho, that.tamanho) &&
                Objects.equals(desconto, that.desconto) &&
                Objects.equals(valor_total, that.valor_total) &&
                Objects.equals(valor_unitario, that.valor_unitario) &&
                Objects.equals(produto, that.produto) &&
                Objects.equals(pedido, that.pedido);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, quantidade, observacao, nome, tamanho, desconto, valor_total, valor_unitario, produto, pedido);
    }

    // toString
    @Override
    public String toString() {
        return "PedidoProduto{" +
                "id=" + id +
                ", quantidade=" + quantidade +
                ", observacao='" + observacao + '\'' +
                ", nome='" + nome + '\'' +
                ", tamanho='" + tamanho + '\'' +
                ", desconto=" + desconto +
                ", valor_total=" + valor_total +
                ", valor_unitario=" + valor_unitario +
                ", produto=" + produto +
                ", pedido=" + pedido +
                '}';
    }
}