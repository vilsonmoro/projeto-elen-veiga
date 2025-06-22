package com.tcc2.ellemVeigaOficial.config.userdetails;


import com.tcc2.ellemVeigaOficial.models.Usuario;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails, Serializable {
 	private static final long serialVersionUID = 1L;
	private Usuario user;

    public UserDetailsImpl(Usuario user) {    	
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

  }

    @Override
    public String getPassword() {
        return user.getSenha();
    }

    @Override
    public String getUsername() {
        return user.getUsuario();
    }

    public Long getId() {
        return user.getId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
