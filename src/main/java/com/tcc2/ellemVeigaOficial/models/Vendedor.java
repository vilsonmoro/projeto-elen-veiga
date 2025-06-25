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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
public class Vendedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codigo_vend")
    private Long id;
	@Column(name = "nome_vend", nullable = false, length = 100)
    private String nome;
	@Column(name = "sobrenome_vend", length = 100)
    private String sobrenome;
	@Column(name = "email_vend", length = 100)
    private String email;
	@Column(name = "desconto_vend", nullable = false, length = 100)
    private float desconto;
	@Column(name = "observacao_vend", length = 100)
    private String observacao;

    @Enumerated(EnumType.STRING)
	@Column(name = "tipsta_vend", length = 25)
    private TipoStatus statusVendedor;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "codusu_vend")
    private Usuario usuario;

    public Vendedor(Long id, String nome, String sobrenome, String email, float desconto, String observacao,
            TipoStatus statusVendedor, Usuario usuario) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.desconto = desconto;
        this.observacao = observacao;
        this.statusVendedor = statusVendedor;
        this.usuario = usuario;
    }

    public Vendedor() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public float getDesconto() {
        return desconto;
    }

    public void setDesconto(float desconto) {
        this.desconto = desconto;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public TipoStatus getStatusVendedor() {
        return statusVendedor;
    }

    public void setStatusVendedor(TipoStatus statusVendedor) {
        this.statusVendedor = statusVendedor;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Vendedor [id=" + id + ", nome=" + nome + ", sobrenome=" + sobrenome + ", email=" + email + ", desconto="
                + desconto + ", observacao=" + observacao + ", statusVendedor=" + statusVendedor + ", usuario="
                + usuario + "]";
    }
}