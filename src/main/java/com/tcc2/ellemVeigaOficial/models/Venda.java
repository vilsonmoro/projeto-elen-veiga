package com.tcc2.ellemVeigaOficial.models;

import java.util.Date;
import java.util.Objects;

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

@Entity
public class Venda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_ven")
    private Long id;
	@Column(name = "data_ven", nullable = false, length = 100)
    private Date data;
	@Column(name = "comissao_ven", length = 100)
    private Float comissao;
	@Column(name = "valtot_ven", nullable = false, length = 100)
    private Float valorTotal;
	@Column(name = "qtdparcela_ven", length = 100)
    private int parcela;
	@Column(name = "observacao_ven", length = 100)
    private String observacao;
	@Column(name = "frete_ven", length = 100)
    private Float frete;
	@Column(name = "valent_ven", nullable = false, length = 100)
    private Float valorEntrada;
	@Column(name = "valrest_ven", nullable = false, length = 100)
    private Float valorRestante;

	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codusu_ven")
	private Usuario usuario;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codped_ven")
    private Pedido pedido;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codcli_ven")
    private Cliente cliente;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codvend_ven")
    private Vendedor vendedor;
	
    @Enumerated(EnumType.STRING)
	@Column(name = "forpag_ven", length = 25)
    private FormaPagamento formaPagamento;
	
    @Enumerated(EnumType.STRING)
	@Column(name = "tipent_ven", length = 25)
    private TipoEntrega tipoEntrega;

	// Construtor padrão
    public Venda() {}

    // Construtor completo
    public Venda(Long id, Date data, Float comissao, Float valorTotal, int parcela, String observacao, Float frete,
                 Float valorEntrada, Float valorRestante, Usuario usuario, Pedido pedido, Cliente cliente, Vendedor vendedor,
                 FormaPagamento formaPagamento, TipoEntrega tipoEntrega) {
        this.id = id;
        this.data = data;
        this.comissao = comissao;
        this.valorTotal = valorTotal;
        this.parcela = parcela;
        this.observacao = observacao;
        this.frete = frete;
        this.valorEntrada = valorEntrada;
        this.valorRestante = valorRestante;
        this.usuario = usuario;
        this.pedido = pedido;
        this.cliente = cliente;
        this.vendedor = vendedor;
        this.formaPagamento = formaPagamento;
        this.tipoEntrega = tipoEntrega;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getData() { return data; }
    public void setData(Date data) { this.data = data; }

    public Float getComissao() { return comissao; }
    public void setComissao(Float comissao) { this.comissao = comissao; }

    public Float getValorTotal() { return valorTotal; }
    public void setValorTotal(Float valorTotal) { this.valorTotal = valorTotal; }

    public int getParcela() { return parcela; }
    public void setParcela(int parcela) { this.parcela = parcela; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }

    public Float getFrete() { return frete; }
    public void setFrete(Float frete) { this.frete = frete; }

    public Float getValorEntrada() { return valorEntrada; }
    public void setValorEntrada(Float valorEntrada) { this.valorEntrada = valorEntrada; }

    public Float getValorRestante() { return valorRestante; }
    public void setValorRestante(Float valorRestante) { this.valorRestante = valorRestante; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Vendedor getVendedor() { return vendedor; }
    public void setVendedor(Vendedor vendedor) { this.vendedor = vendedor; }

    public FormaPagamento getFormaPagamento() { return formaPagamento; }
    public void setFormaPagamento(FormaPagamento formaPagamento) { this.formaPagamento = formaPagamento; }

    public TipoEntrega getTipoEntrega() { return tipoEntrega; }
    public void setTipoEntrega(TipoEntrega tipoEntrega) { this.tipoEntrega = tipoEntrega; }

    // equals e hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Venda)) return false;
        Venda venda = (Venda) o;
        return parcela == venda.parcela &&
                Objects.equals(id, venda.id) &&
                Objects.equals(data, venda.data) &&
                Objects.equals(comissao, venda.comissao) &&
                Objects.equals(valorTotal, venda.valorTotal) &&
                Objects.equals(observacao, venda.observacao) &&
                Objects.equals(frete, venda.frete) &&
                Objects.equals(valorEntrada, venda.valorEntrada) &&
                Objects.equals(valorRestante, venda.valorRestante) &&
                Objects.equals(usuario, venda.usuario) &&
                Objects.equals(pedido, venda.pedido) &&
                Objects.equals(cliente, venda.cliente) &&
                Objects.equals(vendedor, venda.vendedor) &&
                formaPagamento == venda.formaPagamento &&
                tipoEntrega == venda.tipoEntrega;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, data, comissao, valorTotal, parcela, observacao, frete, valorEntrada, valorRestante,
                usuario, pedido, cliente, vendedor, formaPagamento, tipoEntrega);
    }

    // toString
    @Override
    public String toString() {
        return "Venda{" +
                "id=" + id +
                ", data=" + data +
                ", comissao=" + comissao +
                ", valorTotal=" + valorTotal +
                ", parcela=" + parcela +
                ", observacao='" + observacao + '\'' +
                ", frete=" + frete +
                ", valorEntrada=" + valorEntrada +
                ", valorRestante=" + valorRestante +
                ", usuario=" + usuario +
                ", pedido=" + pedido +
                ", cliente=" + cliente +
                ", vendedor=" + vendedor +
                ", formaPagamento=" + formaPagamento +
                ", tipoEntrega=" + tipoEntrega +
                '}';
    }
}