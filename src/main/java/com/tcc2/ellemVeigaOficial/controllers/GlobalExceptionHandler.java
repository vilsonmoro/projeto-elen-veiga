package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;

import com.tcc2.ellemVeigaOficial.tratamentoerros.ClienteNaoEncontradoException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.EntidadeRelacionadaException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.PedidoNaoEncontradoException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.PedidoProdutoNaoEncontradoException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.ProdutoNaoEncontradoException;
import com.tcc2.ellemVeigaOficial.tratamentoerros.UsuarioNaoEncontradoException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ClienteNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleClienteNaoEncontrado(ClienteNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erro", ex.getMessage()));
    }

    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioNaoEncontrado(UsuarioNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("erro", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidacao(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
            .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleJsonMalFormatado(HttpMessageNotReadableException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("erro", "Formato de JSON inválido ou dados incompatíveis."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneric(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("erro", "Erro interno inesperado.", "detalhes", ex.getMessage()));
    }

    @ExceptionHandler(PedidoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handlePedidoNaoEncontrado(PedidoNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erro", ex.getMessage()));
    }

    @ExceptionHandler(EntidadeRelacionadaException.class)
    public ResponseEntity<Map<String, String>> handleEntidadeRelacionada(EntidadeRelacionadaException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("erro", ex.getMessage()));
    }

    @ExceptionHandler(PedidoProdutoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handlePedidoProdutoNaoEncontrado(PedidoProdutoNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erro", ex.getMessage()));
    }

    @ExceptionHandler(ProdutoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleProdutoNaoEncontrado(ProdutoNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erro", ex.getMessage()));
    }



  /*  @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponse> handleOutrasExceptions(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErroResponse("Erro inesperado", ex.getMessage()));
    }*/

    public record ErroResponse(String erro, String detalhe) {}

}
