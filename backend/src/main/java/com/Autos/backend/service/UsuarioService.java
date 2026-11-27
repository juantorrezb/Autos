package com.Autos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Autos.backend.model.Usuario;
import com.Autos.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository UsuarioRepository;

    // Listar todos los usuarios
    public List<Usuario> obtenerTodos() {
        return UsuarioRepository.findAll();
    }

    // Guardar / Registrar un nuevo usuarios
    public Usuario guardar(Usuario usuario) {
        if (usuario == null)
            throw new IllegalArgumentException("El usuario no puede ser nulo");

        if (usuario.getCorreo() == null || usuario.getCorreo().trim().isBlank())
            throw new IllegalArgumentException("El correo no puede estar vacio");

        if (UsuarioRepository.existsByCorreo(usuario.getCorreo().trim()))
            throw new IllegalArgumentException("Este correo ya se encuentra registrado");

        if (usuario.getPassword() == null || usuario.getPassword().trim().isBlank())
            throw new IllegalArgumentException("La contraseña no puede estar vacia");

        if (usuario.getPassword().trim().length() < 6)
            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres");

        usuario.setCorreo(usuario.getCorreo().trim());

        return UsuarioRepository.save(usuario);
    }

    // Autenticar usu o administrador (Login)
    public Usuario autenticar(String correo, String password) {
        if (correo == null || correo.trim().isBlank() || password == null || password.trim().isBlank()) {
            return null;
        }

        Optional<Usuario> usuarioOpt = UsuarioRepository.findByCorreo(correo.trim());
        if (usuarioOpt.isPresent() && usuarioOpt.get().getPassword().equals(password)) {
            return usuarioOpt.get();
        }

        return null;
    }

    // Obtener por id
    public Usuario obtenerPorId(Long id) {
        return UsuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    // Actualizar datos del usu
    public Usuario actualizar(Long id, Usuario nuevosDatos) {
        Usuario usuario = obtenerPorId(id);

        if (nuevosDatos.getNombre() != null && !nuevosDatos.getNombre().trim().isEmpty())
            usuario.setNombre(nuevosDatos.getNombre().trim());

        if (nuevosDatos.getRut() != null && !nuevosDatos.getRut().trim().isEmpty())
            usuario.setRut(nuevosDatos.getRut().trim());

        if (nuevosDatos.getCorreo() != null && !nuevosDatos.getCorreo().trim().isEmpty())
            usuario.setCorreo(nuevosDatos.getCorreo().trim());

        if (nuevosDatos.getPassword() != null && !nuevosDatos.getPassword().trim().isEmpty())
            usuario.setPassword(nuevosDatos.getPassword());

        return UsuarioRepository.save(usuario);
    }

    // Eliminar usuarios por id
    public void eliminar(Long id) {
        if (!UsuarioRepository.existsById(id))
            throw new RuntimeException("Usuario no encontrado con id: " + id);

        UsuarioRepository.deleteById(id);
    }
}