package com.Autos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Autos.backend.model.Cliente;
import com.Autos.backend.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    // Listar todos los clientes
    public List<Cliente> obtenerTodos() {
        return clienteRepository.findAll();
    }

    // Guardar / Registrar un nuevo cliente
    public Cliente guardar(Cliente cliente) {
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

        if (cliente.getRol() == null || cliente.getRol().trim().isBlank()) {
            cliente.setRol("cliente");
        }

        cliente.setCorreo(cliente.getCorreo().trim());

        return clienteRepository.save(cliente);
    }

    // Autenticar cliente o administrador (Login)
    public Cliente autenticar(String correo, String password) {
        if (correo == null || correo.trim().isBlank() || password == null || password.trim().isBlank()) {
            return null;
        }

        // Credencial fija de Administrador igual que en el frontend
        if ("admin@autos.cl".equals(correo.trim()) && "admin123".equals(password)) {
            return new Cliente("Administrador", "11111111-1", "admin@autos.cl", "", "admin");
        }

        Optional<Cliente> clienteOpt = clienteRepository.findByCorreo(correo.trim());
        if (clienteOpt.isPresent() && clienteOpt.get().getPassword().equals(password)) {
            return clienteOpt.get();
        }

        return null;
    }

    // Obtener por id
    public Cliente obtenerPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + id));
    }

    // Actualizar datos del cliente
    public Cliente actualizar(Long id, Cliente nuevosDatos) {
        Cliente cliente = obtenerPorId(id);

        if (nuevosDatos.getNombre() != null && !nuevosDatos.getNombre().trim().isEmpty())
            cliente.setNombre(nuevosDatos.getNombre().trim());

        if (nuevosDatos.getRut() != null && !nuevosDatos.getRut().trim().isEmpty())
            cliente.setRut(nuevosDatos.getRut().trim());

        if (nuevosDatos.getCorreo() != null && !nuevosDatos.getCorreo().trim().isEmpty())
            cliente.setCorreo(nuevosDatos.getCorreo().trim());

        if (nuevosDatos.getPassword() != null && !nuevosDatos.getPassword().trim().isEmpty())
            cliente.setPassword(nuevosDatos.getPassword());

        if (nuevosDatos.getRol() != null && !nuevosDatos.getRol().trim().isEmpty())
            cliente.setRol(nuevosDatos.getRol().trim());

        return clienteRepository.save(cliente);
    }

    // Eliminar cliente por id
    public void eliminar(Long id) {
        if (!clienteRepository.existsById(id))
            throw new RuntimeException("Cliente no encontrado con id: " + id);

        clienteRepository.deleteById(id);
    }
}