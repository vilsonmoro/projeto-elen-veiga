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
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_ped")
    private Long id;
	
	@Column(name = "data_ped", nullable = false, length = 100)
    private Date data;

	@Column(name = "descrevend_ped", length = 100)
    private Float desconto_revendedor;

	@Column(name = "frete_ped", length = 100)
    private Float frete;

	@Column(name = "valtot_ped", nullable = false, length = 100)
    private Float valor_total;

	@Column(name = "valent_ped", nullable = false, length = 100)
    private Float valor_entrada;

    @Column(name = "valrest_ped", nullable = false, length = 100)
    private Float valor_restante;

	@Column(name = "qtdparcela_ped", nullable = false, length = 100)
    private int qtd_parcela;

	@Column(name = "dataent_ped", length = 100)
    private Date data_entrega;

    @Enumerated(EnumType.STRING)
	@Column(name = "status_ped", length = 25)
    private TipoStatus status_pedido;
		
    @Enumerated(EnumType.STRING)
	@Column(name = "forpag_ped", length = 25)
    private FormaPagamento forma_pagamento;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "codusu_ped")
	private Usuario usuario;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "codcli_ped")
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipent_ped", length = 25)
    private TipoEntrega tipo_entrega;

    public Pedido(Long id, Date data, Float desconto_revendedor, Float frete, Float valor_total, Float valor_entrada,
            Float valor_restante, int qtd_parcela, Date data_entrega, TipoStatus status_pedido,
            FormaPagamento forma_pagamento, Usuario usuario, Cliente cliente, TipoEntrega tipo_entrega) {
        this.id = id;
        this.data = data;
        this.desconto_revendedor = desconto_revendedor;
        this.frete = frete;
        this.valor_total = valor_total;
        this.valor_entrada = valor_entrada;
        this.valor_restante = valor_restante;
        this.qtd_parcela = qtd_parcela;
        this.data_entrega = data_entrega;
        this.status_pedido = status_pedido;
        this.forma_pagamento = forma_pagamento;
        this.usuario = usuario;
        this.cliente = cliente;
        this.tipo_entrega = tipo_entrega;
    }

    public Pedido() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getData() { return data; }
    public void setData(Date data) { this.data = data; }

    public Float getDesconto_revendedor() { return desconto_revendedor; }
    public void setDesconto_revendedor(Float desconto_revendedor) { this.desconto_revendedor = desconto_revendedor; }

    public Float getFrete() { return frete; }
    public void setFrete(Float frete) { this.frete = frete; }

    public Float getValor_total() { return valor_total; }
    public void setValor_total(Float valor_total) { this.valor_total = valor_total; }

    public Float getValor_entrada() { return valor_entrada; }
    public void setValor_entrada(Float valor_entrada) { this.valor_entrada = valor_entrada; }

    public Float getValor_restante() { return valor_restante; }
    public void setValor_restante(Float valor_restante) { this.valor_restante = valor_restante; }

    public int getQtd_parcela() { return qtd_parcela; }
    public void setQtd_parcela(int qtd_parcela) { this.qtd_parcela = qtd_parcela; }

    public Date getData_entrega() { return data_entrega; }
    public void setData_entrega(Date data_entrega) { this.data_entrega = data_entrega; }

    public TipoStatus getStatus_pedido() { return status_pedido; }
    public void setStatus_pedido(TipoStatus status_pedido) { this.status_pedido = status_pedido; }

    public FormaPagamento getForma_pagamento() { return forma_pagamento; }
    public void setForma_pagamento(FormaPagamento forma_pagamento) { this.forma_pagamento = forma_pagamento; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public TipoEntrega getTipo_entrega() { return tipo_entrega; }
    public void setTipo_entrega(TipoEntrega tipo_entrega) { this.tipo_entrega = tipo_entrega; }

    // equals e hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pedido)) return false;
        Pedido pedido = (Pedido) o;
        return qtd_parcela == pedido.qtd_parcela &&
                Objects.equals(id, pedido.id) &&
                Objects.equals(data, pedido.data) &&
                Objects.equals(desconto_revendedor, pedido.desconto_revendedor) &&
                Objects.equals(frete, pedido.frete) &&
                Objects.equals(valor_total, pedido.valor_total) &&
                Objects.equals(valor_entrada, pedido.valor_entrada) &&
                Objects.equals(valor_restante, pedido.valor_restante) &&
                Objects.equals(data_entrega, pedido.data_entrega) &&
                status_pedido == pedido.status_pedido &&
                forma_pagamento == pedido.forma_pagamento &&
                Objects.equals(usuario, pedido.usuario) &&
                Objects.equals(cliente, pedido.cliente) &&
                tipo_entrega == pedido.tipo_entrega;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, data, desconto_revendedor, frete, valor_total, valor_entrada, valor_restante, qtd_parcela, data_entrega, status_pedido, forma_pagamento, usuario, cliente, tipo_entrega);
    }

    // toString
    @Override
    public String toString() {
        return "Pedido{" +
                "id=" + id +
                ", data=" + data +
                ", desconto_revendedor=" + desconto_revendedor +
                ", frete=" + frete +
                ", valor_total=" + valor_total +
                ", valor_entrada=" + valor_entrada +
                ", valor_restante=" + valor_restante +
                ", qtd_parcela=" + qtd_parcela +
                ", data_entrega=" + data_entrega +
                ", status_pedido=" + status_pedido +
                ", forma_pagamento=" + forma_pagamento +
                ", usuario=" + usuario +
                ", cliente=" + cliente +
                ", tipo_entrega=" + tipo_entrega +
                '}';
    }

}