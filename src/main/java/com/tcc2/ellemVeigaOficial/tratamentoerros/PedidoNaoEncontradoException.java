package com.tcc2.ellemVeigaOficial.tratamentoerros;

public class PedidoNaoEncontradoException extends RuntimeException {
    public PedidoNaoEncontradoException(String message) {
        super(message);
    }
}
