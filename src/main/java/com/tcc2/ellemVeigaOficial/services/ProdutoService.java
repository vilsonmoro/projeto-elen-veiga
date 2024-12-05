package com.tcc2.ellemVeigaOficial.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.tcc2.ellemVeigaOficial.models.Produto;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.repositories.ProdutoRepository;
import com.tcc2.ellemVeigaOficial.repositories.UsuarioRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoService {
    @Autowired
    private ProdutoRepository repository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Produto addProduto(Produto produto){
        if (produto.getUsuario() != null && produto.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(produto.getUsuario().getId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            produto.setUsuario(usuario);
        }
        return repository.save(produto);
    }

    public Produto findById(Long id){
        return repository.findById(id).get();
    }

    public List<Produto> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Produto update(Long id, Produto produto){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado");
        }
        produto.setId(id);

        if (produto.getUsuario() != null && produto.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(produto.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            produto.setUsuario(usuario);
        }

        return repository.save(produto);
    }

    public List<Produto> buscarProdutos(Long codigo, String nome) {
        return repository.buscarProdutos(codigo, nome);
    }
}