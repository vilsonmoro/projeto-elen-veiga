package com.tcc2.ellemVeigaOficial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tcc2.ellemVeigaOficial.config.authentication.JwtTokenService;

@Controller
public class PageController {
    @Autowired
    private JwtTokenService jwtTokenService;
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/paginainicial")
    public String paginainicial(@RequestParam(value = "token", required = false) String token, Model model) {
        // Verifica se o token foi passado
        if (token == null || !jwtTokenService.validarToken(token)) {
            // Caso o token seja inválido ou não exista, redireciona ou mostra um erro
            return "redirect:/login"; // Ou alguma outra página de erro
        }

        // Se o token for válido, processa a lógica para a página inicial
        model.addAttribute("mensagem", "Bem-vindo à página inicial!");
        return "paginainicial";  // Retorna a página de sucesso
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
