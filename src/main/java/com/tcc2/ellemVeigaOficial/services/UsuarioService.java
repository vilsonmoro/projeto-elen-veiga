package com.tcc2.ellemVeigaOficial.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;
    private PasswordEncoder passwordEncoder;
    

    public UsuarioService(UsuarioRepository repository){
        this.repository = repository;
    }

    public Usuario login(String nomeusuario, String senha) {
        return repository.findByUsuario(nomeusuario)
                .filter(usuario -> passwordEncoder.matches(senha, usuario.getSenha()))
                .orElseThrow(() -> new RuntimeException("Usuário ou senha inválidos"));
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    
    public Usuario salvarUsuario(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return repository.save(usuario);
    }    

    public Usuario addUsuario(Usuario usuario){
        return repository.save(usuario);
    }

    public Usuario findById(long id){
        return repository.findById(id).get();
    }
    
    public Usuario findByUsuario(String usuario){
        return repository.findByUsuario(usuario).get();
    }

    public List<Usuario> findAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Usuario update(Long id, Usuario usuario){
        if (!repository.existsById(id)) {
            throw new RuntimeException("Usuario não encontrado");}
        usuario.setId(id);
        return repository.save(usuario);
    }

}
