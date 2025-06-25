package com.tcc2.ellemVeigaOficial.models;

import java.util.Objects;

public class Login {
    private String usuario;
    private String senha;
    
    public Login() {
    }

    public Login(String usuario, String senha) {
        this.usuario = usuario;
        this.senha = senha;
    }

    // Getters
    public String getUsuario() {
        return usuario;
    }

    public String getSenha() {
        return senha;
    }

    // Setters
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    // equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Login)) return false;
        Login login = (Login) o;
        return Objects.equals(usuario, login.usuario) &&
               Objects.equals(senha, login.senha);
    }

    // hashCode
    @Override
    public int hashCode() {
        return Objects.hash(usuario, senha);
    }

    // toString
    @Override
    public String toString() {
        return "Login{" +
                "usuario='" + usuario + '\'' +
                ", senha='" + senha + '\'' +
                '}';
    }
}
