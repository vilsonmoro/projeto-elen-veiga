package com.tcc2.ellemVeigaOficial.controllers;

import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.FormaPagamento;

import lombok.AllArgsConstructor;
import lombok.Getter;

@RestController
@RequestMapping("/formapagamento")
public class FormaPagamentoController {
    @GetMapping
    public List<FormaPagamentoDTO> getAllFormasPagamento() {
        return Arrays.stream(FormaPagamento.values())
                     .map(forma -> new FormaPagamentoDTO(forma.name(), forma.getDescricao()))
                     .collect(Collectors.toList());
    }

    @AllArgsConstructor
    @Getter
    public static class FormaPagamentoDTO {
        private final String nome;
        private final String descricao;
    }
}
