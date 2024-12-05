package com.tcc2.ellemVeigaOficial.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_end")
    private Long id;
    @Column(name = "logadouro_end", nullable = false, length = 255)
    private String logadouro;
    @Column(name = "cidade_end", length = 100)
    private String cidade;
    @Column(name = "estado_end", length = 100)
    private String estado;
    @Column(name = "cep_end", length = 10)
    private String cep;
}