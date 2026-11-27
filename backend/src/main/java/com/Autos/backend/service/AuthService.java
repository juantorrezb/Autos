package com.Autos.backend.service;

import com.Autos.backend.dto.AuthResponse;
import com.Autos.backend.dto.LoginRequest;
import com.Autos.backend.dto.RegisterRequest;
import com.Autos.backend.model.Rol;
import com.Autos.backend.model.Usuario;
import com.Autos.backend.repository.RolRepository;
import com.Autos.backend.repository.UsuarioRepository;
import com.Autos.backend.security.CustomUserDetailsService;
import com.Autos.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    public AuthService(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            CustomUserDetailsService userDetailsService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    public AuthResponse registrar(RegisterRequest request) {
        if (usuarioRepository.existsByCorreo(request.correo())) {
            throw new IllegalArgumentException("El correo ya está registrado.");
        }
        if (usuarioRepository.existsByRut(request.rut())) {
            throw new IllegalArgumentException("El RUT ya está registrado.");
        }

        Rol rolCliente = rolRepository.findByNombre("ROLE_CLIENTE")
                .orElseThrow(() -> new RuntimeException("Rol ROLE_CLIENTE no encontrado en la base de datos."));

        Usuario usuario = new Usuario(
                request.nombre(),
                request.correo(),
                request.rut(),
                passwordEncoder.encode(request.password())
        );
        usuario.getRoles().add(rolCliente);

        usuarioRepository.save(usuario);

        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getCorreo());
        String token = jwtService.generarToken(userDetails);

        return construirRespuesta(usuario, token);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.correo(), request.password())
        );

        Usuario usuario = usuarioRepository.findByCorreo(request.correo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));

        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getCorreo());
        String token = jwtService.generarToken(userDetails);

        return construirRespuesta(usuario, token);
    }

    private AuthResponse construirRespuesta(Usuario usuario, String token) {
        List<String> roles = usuario.getRoles().stream()
                .map(Rol::getNombre)
                .toList();

        return new AuthResponse(token, usuario.getNombre(), usuario.getCorreo(), roles);
    }
}