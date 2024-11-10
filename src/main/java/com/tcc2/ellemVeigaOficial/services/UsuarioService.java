package com.tcc2.ellemVeigaOficial.services;

import java.util.List;

import com.tcc2.ellemVeigaOficial.config.authentication.JwtTokenService;
import com.tcc2.ellemVeigaOficial.config.userdetails.UserDetailsImpl;
import com.tcc2.ellemVeigaOficial.models.Login;
import com.tcc2.ellemVeigaOficial.models.security.RecoveryJwtTokenDto;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenService jwtTokenService;
    

    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder, JwtTokenService jwtTokenService, AuthenticationManager authenticationManager){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
        this.authenticationManager = authenticationManager;
    }

    public RecoveryJwtTokenDto authenticateUser(Login loginUserDto) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginUserDto.getUsuario(), loginUserDto.getSenha());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new RecoveryJwtTokenDto(jwtTokenService.generateToken(userDetails));
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

    public List<Usuario> buscarUsuarios(Long id, String nome, String sobrenome) {
        return repository.buscarUsuarios(id, nome, sobrenome);
    }

}