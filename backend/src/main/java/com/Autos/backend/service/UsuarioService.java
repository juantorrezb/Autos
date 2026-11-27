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
    private UsuarioRepository clienteRepository;

    // Listar todos los clientes
    public List<Usuario> obtenerTodos() {
        return clienteRepository.findAll();
    }

    // Guardar / Registrar un nuevo cliente
    public Usuario guardar(Usuario cliente) {
        if (cliente == null)
            throw new IllegalArgumentException("El cliente no puede ser nulo");

        if (cliente.getCorreo() == null || cliente.getCorreo().trim().isBlank())
            throw new IllegalArgumentException("El correo no puede estar vacio");

        if (clienteRepository.existsByCorreo(cliente.getCorreo().trim()))
            throw new IllegalArgumentException("Este correo ya se encuentra registrado");

        if (cliente.getPassword() == null || cliente.getPassword().trim().isBlank())
            throw new IllegalArgumentException("La contraseña no puede estar vacia");

        if (cliente.getPassword().trim().length() < 6)
            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres");

        cliente.setCorreo(cliente.getCorreo().trim());

        return clienteRepository.save(cliente);
    }

    // Autenticar cliente o administrador (Login)
    public Usuario autenticar(String correo, String password) {
        if (correo == null || correo.trim().isBlank() || password == null || password.trim().isBlank()) {
            return null;
        }

        Optional<Usuario> clienteOpt = clienteRepository.findByCorreo(correo.trim());
        if (clienteOpt.isPresent() && clienteOpt.get().getPassword().equals(password)) {
            return clienteOpt.get();
        }

        return null;
    }

    // Obtener por id
    public Usuario obtenerPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    // Actualizar datos del cliente
    public Usuario actualizar(Long id, Usuario nuevosDatos) {
        Usuario cliente = obtenerPorId(id);

        if (nuevosDatos.getNombre() != null && !nuevosDatos.getNombre().trim().isEmpty())
            cliente.setNombre(nuevosDatos.getNombre().trim());

        if (nuevosDatos.getRut() != null && !nuevosDatos.getRut().trim().isEmpty())
            cliente.setRut(nuevosDatos.getRut().trim());

        if (nuevosDatos.getCorreo() != null && !nuevosDatos.getCorreo().trim().isEmpty())
            cliente.setCorreo(nuevosDatos.getCorreo().trim());

        if (nuevosDatos.getPassword() != null && !nuevosDatos.getPassword().trim().isEmpty())
            cliente.setPassword(nuevosDatos.getPassword());

        return clienteRepository.save(cliente);
    }

    // Eliminar cliente por id
    public void eliminar(Long id) {
        if (!clienteRepository.existsById(id))
            throw new RuntimeException("Usuario no encontrado con id: " + id);

        clienteRepository.deleteById(id);
    }
}