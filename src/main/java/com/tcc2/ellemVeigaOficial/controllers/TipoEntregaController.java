package com.tcc2.ellemVeigaOficial.controllers;

import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tcc2.ellemVeigaOficial.dto.TipoEntregaDTO;
import com.tcc2.ellemVeigaOficial.models.TipoEntrega;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin
@Tag(name = "Tipo de entrega", description = "Operações relacionadas aos tipos de entrega")
public class TipoEntregaController {
    TipoEntregaDTO tipoEntregaDTO;

    @GetMapping("/tipoentrega")
    public List<TipoEntregaDTO> getAllTiposEntrega() {
        return Arrays.stream(TipoEntrega.values())
                     .map(tipo -> new TipoEntregaDTO(tipo.name(), tipo.getDescricao()))
                     .collect(Collectors.toList());
    }
}
