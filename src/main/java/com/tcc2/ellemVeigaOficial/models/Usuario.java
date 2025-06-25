package com.tcc2.ellemVeigaOficial.models;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_usu")
    private Long id;

    @Column(name = "nome_usu", nullable = false, length = 100)
    private String nome;

    @Column(name = "sobrenome_usu", length = 100)
    private String sobrenome;

    @Column(name = "usuario_usu", unique = true, nullable = false, length = 50)
    private String usuario;
    
    @Column(name = "email_usu", unique = true, nullable = false, length = 100)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "senha_usu", nullable = false)
    private String senha;

    public Usuario(String usuario, String senha) {
        this.usuario = usuario;
        this.senha = senha;
    }

    public Usuario(Long id, String nome, String sobrenome, String usuario, String email, String senha) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.usuario = usuario;
        this.email = email;
        this.senha = senha;
    }

    public Usuario() {
    }

     public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }

    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    // equals e hashCode (não incluí senha para equals por segurança)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Usuario)) return false;
        Usuario usuario1 = (Usuario) o;
        return Objects.equals(id, usuario1.id) &&
               Objects.equals(nome, usuario1.nome) &&
               Objects.equals(sobrenome, usuario1.sobrenome) &&
               Objects.equals(usuario, usuario1.usuario) &&
               Objects.equals(email, usuario1.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, sobrenome, usuario, email);
    }

    // toString (não inclui senha por segurança)
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", sobrenome='" + sobrenome + '\'' +
                ", usuario='" + usuario + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}