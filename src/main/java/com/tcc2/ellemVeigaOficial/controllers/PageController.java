package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/paginainicial")
    public String paginainicial() {
        return "paginainicial"; 
    }

    @GetMapping("/relatorio")
    public String relatorio() {
        return "relatorio"; 
    }

    @GetMapping("/fluxocaixa")
    public String fluxocaixa() {
        return "fluxocaixa";
    }

    @GetMapping("/editarcliente")
    public String alterarcliente() {
        return "alterarcliente"; 
    }

    @GetMapping("/editarpagamento")
    public String alterarpagamento() {
        return "alterarpagamento"; 
    }

    @GetMapping("/editarpedido")
    public String alterarpedido() {
        return "alterarpedido";
    }

    @GetMapping("/editarproduto")
    public String alterarproduto() {
        return "alterarproduto"; 
    }

    @GetMapping("/editarusuario")
    public String alterarusuario() {
        return "alterarusuario"; 
    }

    @GetMapping("/editarvenda")
    public String alterarvenda() {
        return "alterarvenda";
    }

    @GetMapping("/editarvendedor")
    public String alterarvendedor() {
        return "alterarvendedor"; 
    }

    @GetMapping("/buscarcliente")
    public String buscarcliente() {
        return "buscarcliente"; 
    }
    
    @GetMapping("/buscarpagamento")
    public String buscarpagamento() {
        return "buscarpagamento"; 
    }

    @GetMapping("/buscarpedido")
    public String buscarpedido() {
        return "buscarpedido";
    }

    @GetMapping("/buscarproduto")
    public String buscarproduto() {
        return "buscarproduto"; 
    }

    @GetMapping("/buscarusuario")
    public String buscarusuario() {
        return "buscarusuario"; 
    }

    @GetMapping("/buscarvenda")
    public String buscarvenda() {
        return "buscarvenda";
    }

    @GetMapping("/buscarvendedor")
    public String buscarvendedor() {
        return "buscarvendedor"; 
    }

    @GetMapping("/cadastrocliente")
    public String cadastrocliente() {
        return "cadastrocliente"; 
    }
    
    @GetMapping("/cadastropagamento")
    public String cadastropagamento() {
        return "cadastropagamento"; 
    }

    @GetMapping("/cadastropedido")
    public String cadastropedido() {
        return "cadastropedido";
    }

    @GetMapping("/cadastroproduto")
    public String cadastroproduto() {
        return "cadastroproduto"; 
    }

    @GetMapping("/cadastrousuario")
    public String cadastrousuario() {
        return "cadastrousuario"; 
    }

    @GetMapping("/cadastrovenda")
    public String cadastrovenda() {
        return "cadastrovenda";
    }

    @GetMapping("/cadastrovendedor")
    public String cadastrovendedor() {
        return "cadastrovendedor"; 
    }
}
