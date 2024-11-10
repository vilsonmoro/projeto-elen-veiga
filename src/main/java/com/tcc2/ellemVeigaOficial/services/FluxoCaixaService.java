package com.tcc2.ellemVeigaOficial.services;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import com.tcc2.ellemVeigaOficial.models.FluxoCaixa;
import com.tcc2.ellemVeigaOficial.models.Produto;
import com.tcc2.ellemVeigaOficial.models.ProdutoVenda;
import com.tcc2.ellemVeigaOficial.models.Venda;
import com.tcc2.ellemVeigaOficial.repositories.ProdutoVendaRepository;
import com.tcc2.ellemVeigaOficial.repositories.VendaRepository;

@Service
public class FluxoCaixaService {
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ProdutoVendaRepository produtovendaRepository;

    public List<FluxoCaixa> gerarRelatorioFluxoCaixa(Date dataInicio, Date dataFim) {
        List<FluxoCaixa> relatorio = new ArrayList<>();
        List<Venda> vendas = vendaRepository.findByDataBetween(dataInicio, dataFim);
    
        Float totalEntradas = 0f;
        Float totalSaidas = 0f;
    
        for (Venda venda : vendas) {
            // Cálculo das entradas
            Float valorVenda = venda.getValorTotal();
    
            relatorio.add(FluxoCaixa.builder()
                .data(venda.getData().toInstant().atZone(ZoneId.systemDefault()).toLocalDate())
                .idVenda(venda.getId())
                .valor(valorVenda)
                .tipo("entrada")
                .build());
    
            totalEntradas += valorVenda;
    
            // Cálculo das saídas (produtos da venda através de ProdutoVenda)
            List<ProdutoVenda> produtosVenda = produtovendaRepository.findByVenda(venda); // Buscar produtos da venda
    
            for (ProdutoVenda produtoVenda : produtosVenda) {
                Produto produto = produtoVenda.getProduto();
                Float custoTotal = produto.getCustoProduto() * produtoVenda.getQuatidade(); // Custo total
    
                relatorio.add(FluxoCaixa.builder()
                    .data(venda.getData().toInstant().atZone(ZoneId.systemDefault()).toLocalDate())
                    .idProduto(produto.getId())
                    .idVenda(venda.getId())
                    .valor(custoTotal)
                    .tipo("saida")
                    .build());
    
                totalSaidas += custoTotal; // Adiciona ao total de saídas
            }
        }
    
        // Adicionar totais ao relatório
        relatorio.add(FluxoCaixa.builder().valor(totalEntradas).tipo("totalEntrada").build());
        relatorio.add(FluxoCaixa.builder().valor(totalSaidas).tipo("totalSaida").build());
    
        return relatorio;
    }
}
