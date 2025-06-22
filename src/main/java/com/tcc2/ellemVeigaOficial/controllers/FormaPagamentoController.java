package com.tcc2.ellemVeigaOficial.controllers;

import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import com.tcc2.ellemVeigaOficial.dto.FormaPagamentoDTO;
import com.tcc2.ellemVeigaOficial.models.FormaPagamento;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
@Tag(name = "Forma de Pagamento", description = "Operações relacionadas a forma de pagamento")
public class FormaPagamentoController {
    FormaPagamentoDTO formaPagamentoDTO;

    @GetMapping("/formapagamento")
    public List<FormaPagamentoDTO> getAllFormasPagamento() {
        return Arrays.stream(FormaPagamento.values())
                     .map(forma -> new FormaPagamentoDTO(forma.name(), forma.getDescricao()))
                     .collect(Collectors.toList());
    }
}