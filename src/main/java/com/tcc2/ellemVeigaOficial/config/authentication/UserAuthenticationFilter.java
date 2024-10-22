package com.tcc2.ellemVeigaOficial.config.authentication;

import com.tcc2.ellemVeigaOficial.config.config.SecurityConfiguration;
import com.tcc2.ellemVeigaOficial.config.userdetails.UserDetailsImpl;
import com.tcc2.ellemVeigaOficial.models.Usuario;
import com.tcc2.ellemVeigaOficial.repositories.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class UserAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;

    private final UsuarioRepository userRepository;

    public UserAuthenticationFilter(JwtTokenService jwtTokenService, UsuarioRepository userRepository) {
        this.jwtTokenService = jwtTokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Verifica se o endpoint requer autenticação antes de processar a requisição
        if (checkIfEndpointIsNotPublic(request)) {
            String token = recoveryToken(request); // Recupera o token do cabeçalho Authorization da requisição
            if (token == null)
                throw new RuntimeException("O token está ausente.");

            String subject = jwtTokenService.getSubjectFromToken(token); // Obtém o assunto (neste caso, o nome de usuário) do token
            Usuario user = userRepository.findByEmail(subject).orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

            UserDetailsImpl userDetails = new UserDetailsImpl(user); // Cria um UserDetails com o usuário encontrado

            // Cria um objeto de autenticação do Spring Security
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());

            // Define o objeto de autenticação no contexto de segurança do Spring Security
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response); // Continua o processamento da requisição
    }

    // Recupera o token do cabeçalho Authorization da requisição
    private String recoveryToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null)
            return null;

        return authorizationHeader.replace("Bearer ", "");
    }

    // Verifica se o endpoint requer autenticação antes de processar a requisição
    private boolean checkIfEndpointIsNotPublic(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        return !Arrays.asList(SecurityConfiguration.ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED).contains(requestURI);
    }
}
