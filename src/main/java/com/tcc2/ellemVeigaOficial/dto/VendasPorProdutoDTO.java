package com.tcc2.ellemVeigaOficial.dto;


public class VendasPorProdutoDTO {
    private String nomeProduto;
    private Double valorTotal;

    public VendasPorProdutoDTO() {
    }

    public VendasPorProdutoDTO(String nomeProduto, Double valorTotal) {
        this.nomeProduto = nomeProduto;
        this.valorTotal = valorTotal;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }
}


