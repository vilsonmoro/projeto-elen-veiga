package com.tcc2.ellemVeigaOficial.models;

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
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_cli")
    private Long id;

    @Column(name = "nome_cli", nullable = false, length = 100)
    private String nome;

    @Column(name = "sobrenome_cli", length = 100)
    private String sobrenome;
    
    @Column(name = "observacao_cli", length = 255)
    private String observacao;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "codusu_cli")
    private Usuario usuario;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "codend_cli")
    private Endereco endereco;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipent_cli", length = 25)
    private TipoEntrega tipo_entrega;

    @Enumerated(EnumType.STRING)
    @Column(name = "tippag_cli", length = 25)
    private FormaPagamento forma_pagamento; 
}