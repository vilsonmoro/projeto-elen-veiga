package com.tcc2.ellemVeigaOficial.dto;


public class VendasPorProdutoDTO {
    private String nomeProduto;
    private Double valorTotal;

    // Construtor vazio
    public VendasPorProdutoDTO() {
    }

    // Construtor com argumentos
    public VendasPorProdutoDTO(String nomeProduto, Double valorTotal) {
        this.nomeProduto = nomeProduto;
        this.valorTotal = valorTotal;
    }

    // Getter e Setter para nomeProduto
    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    // Getter e Setter para valorTotal
    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }
}


