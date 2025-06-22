package com.tcc2.ellemVeigaOficial.controllers;

import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tcc2.ellemVeigaOficial.dto.TipoStatusDTO;
import com.tcc2.ellemVeigaOficial.models.TipoStatus;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin
@Tag(name = "Status", description = "Operações relacionadas aos tipos de status")
public class TipoStatusController {
    TipoStatusDTO tipoStatusDTO;

    @GetMapping("/status")
    public List<TipoStatusDTO> getAllStatus() {
        return Arrays.stream(TipoStatus.values())
                     .map(status -> new TipoStatusDTO(status.name(), status.getDescricao()))
                     .collect(Collectors.toList());
    }
}
