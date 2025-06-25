package com.tcc2.ellemVeigaOficial.models;

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
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_cli")
    private Long id;
    @Column(name = "nome_cli", nullable = false, length = 100)
    private String nome;
    @Column(name = "observacao_cli", length = 255)
    private String observacao;

    @Column(name = "logadouro_cli", nullable = false, length = 255)
    private String logadouro;
    @Column(name = "cidade_cli", length = 100)
    private String cidade;
    @Column(name = "estado_cli", length = 100)
    private String estado;
    @Column(name = "cep_cli", length = 10)
    private String cep;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "codusu_cli")
    private Usuario usuario;
    @Enumerated(EnumType.STRING)
    @Column(name = "tipent_cli", length = 25)
    private TipoEntrega tipo_entrega;
    @Enumerated(EnumType.STRING)
    @Column(name = "tippag_cli", length = 25)
    private FormaPagamento forma_pagamento;

   public Cliente(Long id, String nome, String observacao, String logadouro, String cidade, String estado, String cep,
            Usuario usuario, TipoEntrega tipo_entrega, FormaPagamento forma_pagamento) {
        this.id = id;
        this.nome = nome;
        this.observacao = observacao;
        this.logadouro = logadouro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.usuario = usuario;
        this.tipo_entrega = tipo_entrega;
        this.forma_pagamento = forma_pagamento;
    }

    // Construtor padrão
    public Cliente() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }

    public String getLogadouro() { return logadouro; }
    public void setLogadouro(String logadouro) { this.logadouro = logadouro; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public TipoEntrega getTipo_entrega() { return tipo_entrega; }
    public void setTipo_entrega(TipoEntrega tipo_entrega) { this.tipo_entrega = tipo_entrega; }

    public FormaPagamento getForma_pagamento() { return forma_pagamento; }
    public void setForma_pagamento(FormaPagamento forma_pagamento) { this.forma_pagamento = forma_pagamento; }

    // equals e hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Cliente)) return false;
        Cliente cliente = (Cliente) o;
        return Objects.equals(id, cliente.id) &&
               Objects.equals(nome, cliente.nome) &&
               Objects.equals(observacao, cliente.observacao) &&
               Objects.equals(logadouro, cliente.logadouro) &&
               Objects.equals(cidade, cliente.cidade) &&
               Objects.equals(estado, cliente.estado) &&
               Objects.equals(cep, cliente.cep) &&
               Objects.equals(usuario, cliente.usuario) &&
               tipo_entrega == cliente.tipo_entrega &&
               forma_pagamento == cliente.forma_pagamento;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, observacao, logadouro, cidade, estado, cep, usuario, tipo_entrega, forma_pagamento);
    }

    // toString
    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", observacao='" + observacao + '\'' +
                ", logadouro='" + logadouro + '\'' +
                ", cidade='" + cidade + '\'' +
                ", estado='" + estado + '\'' +
                ", cep='" + cep + '\'' +
                ", usuario=" + usuario +
                ", tipo_entrega=" + tipo_entrega +
                ", forma_pagamento=" + forma_pagamento +
                '}';
    }

}