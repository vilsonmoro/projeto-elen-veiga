package com.tcc2.ellemVeigaOficial.controllers;

import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tcc2.ellemVeigaOficial.models.TipoEntrega;

import lombok.AllArgsConstructor;
import lombok.Getter;

@RestController
@RequestMapping("/tipoentrega")
public class TipoEntregaController {
    @GetMapping
    public List<TipoEntregaDTO> getAllTiposEntrega() {
        return Arrays.stream(TipoEntrega.values())
                     .map(tipo -> new TipoEntregaDTO(tipo.name(), tipo.getDescricao()))
                     .collect(Collectors.toList());
    }

    @AllArgsConstructor
    @Getter
    public static class TipoEntregaDTO {
        private final String nome;
        private final String descricao;
    }
}
