package com.tcc2.ellemVeigaOficial.tratamentoerros;

public class PedidoProdutoNaoEncontradoException extends RuntimeException {
    public PedidoProdutoNaoEncontradoException(String message) {
        super(message);
    }
}