package com.tcc2.ellemVeigaOficial.models;

import java.time.LocalDate;
import java.util.Objects;

public class FluxoCaixa {
    private LocalDate data;
    private String nomeProduto;
    private String nomeCliente;
    private Long idVenda;
    private Float desconto;
    private Float valor;
    private Float valorSemComissao;
    private FormaPagamento formaPagamento;
    private String tipo;

    public FluxoCaixa(LocalDate data, String nomeProduto, String nomeCliente, Long idVenda, Float desconto, Float valor,
            Float valorSemComissao, FormaPagamento formaPagamento, String tipo) {
        this.data = data;
        this.nomeProduto = nomeProduto;
        this.nomeCliente = nomeCliente;
        this.idVenda = idVenda;
        this.desconto = desconto;
        this.valor = valor;
        this.valorSemComissao = valorSemComissao;
        this.formaPagamento = formaPagamento;
        this.tipo = tipo;
    }

    public FluxoCaixa() {
    }

    public LocalDate getData() {
        return data;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public Long getIdVenda() {
        return idVenda;
    }

    public Float getDesconto() {
        return desconto;
    }

    public Float getValor() {
        return valor;
    }

    public Float getValorSemComissao() {
        return valorSemComissao;
    }

    public FormaPagamento getFormaPagamento() {
        return formaPagamento;
    }

    public String getTipo() {
        return tipo;
    }

    // Setters
    public void setData(LocalDate data) {
        this.data = data;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public void setIdVenda(Long idVenda) {
        this.idVenda = idVenda;
    }

    public void setDesconto(Float desconto) {
        this.desconto = desconto;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public void setValorSemComissao(Float valorSemComissao) {
        this.valorSemComissao = valorSemComissao;
    }

    public void setFormaPagamento(FormaPagamento formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    // equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FluxoCaixa)) return false;
        FluxoCaixa that = (FluxoCaixa) o;
        return Objects.equals(data, that.data) &&
               Objects.equals(nomeProduto, that.nomeProduto) &&
               Objects.equals(nomeCliente, that.nomeCliente) &&
               Objects.equals(idVenda, that.idVenda) &&
               Objects.equals(desconto, that.desconto) &&
               Objects.equals(valor, that.valor) &&
               Objects.equals(valorSemComissao, that.valorSemComissao) &&
               Objects.equals(formaPagamento, that.formaPagamento) &&
               Objects.equals(tipo, that.tipo);
    }

    // hashCode
    @Override
    public int hashCode() {
        return Objects.hash(data, nomeProduto, nomeCliente, idVenda, desconto, valor, valorSemComissao, formaPagamento, tipo);
    }

    // toString
    @Override
    public String toString() {
        return "FluxoCaixa{" +
                "data=" + data +
                ", nomeProduto='" + nomeProduto + '\'' +
                ", nomeCliente='" + nomeCliente + '\'' +
                ", idVenda=" + idVenda +
                ", desconto=" + desconto +
                ", valor=" + valor +
                ", valorSemComissao=" + valorSemComissao +
                ", formaPagamento=" + formaPagamento +
                ", tipo='" + tipo + '\'' +
                '}';
    }

    private FluxoCaixa(Builder builder) {
        this.data = builder.data;
        this.nomeProduto = builder.nomeProduto;
        this.nomeCliente = builder.nomeCliente;
        this.idVenda = builder.idVenda;
        this.desconto = builder.desconto;
        this.valor = builder.valor;
        this.valorSemComissao = builder.valorSemComissao;
        this.formaPagamento = builder.formaPagamento;
        this.tipo = builder.tipo;
    }

    public static class Builder {
        private LocalDate data;
        private String nomeProduto;
        private String nomeCliente;
        private Long idVenda;
        private Float desconto;
        private Float valor;
        private Float valorSemComissao;
        private FormaPagamento formaPagamento;
        private String tipo;

        public Builder data(LocalDate data) {
            this.data = data;
            return this;
        }

        public Builder nomeProduto(String nomeProduto) {
            this.nomeProduto = nomeProduto;
            return this;
        }

        public Builder nomeCliente(String nomeCliente) {
            this.nomeCliente = nomeCliente;
            return this;
        }

        public Builder idVenda(Long idVenda) {
            this.idVenda = idVenda;
            return this;
        }

        public Builder desconto(Float desconto) {
            this.desconto = desconto;
            return this;
        }

        public Builder valor(Float valor) {
            this.valor = valor;
            return this;
        }

        public Builder valorSemComissao(Float valorSemComissao) {
            this.valorSemComissao = valorSemComissao;
            return this;
        }

        public Builder formaPagamento(FormaPagamento formaPagamento) {
            this.formaPagamento = formaPagamento;
            return this;
        }

        public Builder tipo(String tipo) {
            this.tipo = tipo;
            return this;
        }

        public FluxoCaixa build() {
            return new FluxoCaixa(this);
        }
    }
}