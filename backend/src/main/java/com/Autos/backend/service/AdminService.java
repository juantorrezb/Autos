package com.Autos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Autos.backend.model.Admin;
import com.Autos.backend.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Listar todos los administradores
    public List<Admin> obtenerTodos() {
        return adminRepository.findAll();
    }

    // Guardar / Registrar un nuevo administrador
    public Admin guardar(Admin admin) {
        if (admin == null)
            throw new IllegalArgumentException("El administrador no puede ser nulo");

        if (admin.getNombre() == null || admin.getNombre().trim().isBlank())
            throw new IllegalArgumentException("El nombre no puede estar vacio");

        if (admin.getCorreo() == null || admin.getCorreo().trim().isBlank())
            throw new IllegalArgumentException("El correo no puede estar vacio");

        if (adminRepository.existsByCorreo(admin.getCorreo().trim()))
            throw new IllegalArgumentException("Este correo de administrador ya esta registrado");

        if (admin.getPassword() == null || admin.getPassword().trim().isBlank())
            throw new IllegalArgumentException("La contraseña no puede estar vacia");

        if (admin.getPassword().trim().length() < 6)
            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres");

        if (admin.getRol() == null || admin.getRol().trim().isBlank()) {
            admin.setRol("admin");
        }

        admin.setNombre(admin.getNombre().trim());
        admin.setCorreo(admin.getCorreo().trim());

        return adminRepository.save(admin);
    }

    // Autenticar administrador (Login)
    public Admin autenticar(String correo, String password) {
        if (correo == null || correo.trim().isBlank() || password == null || password.trim().isBlank()) {
            return null;
        }

        Optional<Admin> adminOpt = adminRepository.findByCorreo(correo.trim());
        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(password)) {
            return adminOpt.get();
        }

        // Respaldo con la cuenta de prueba del frontend si aún no está en la BD
        if ("admin@autos.cl".equals(correo.trim()) && "admin123".equals(password)) {
            return new Admin("Administrador", "admin@autos.cl", "", "admin");
        }

        return null;
    }

    // Obtener por id
    public Admin obtenerPorId(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado con id: " + id));
    }

    // Actualizar datos del administrador
    public Admin actualizar(Long id, Admin nuevosDatos) {
        Admin admin = obtenerPorId(id);

        if (nuevosDatos.getNombre() != null && !nuevosDatos.getNombre().trim().isEmpty())
            admin.setNombre(nuevosDatos.getNombre().trim());

        if (nuevosDatos.getCorreo() != null && !nuevosDatos.getCorreo().trim().isEmpty())
            admin.setCorreo(nuevosDatos.getCorreo().trim());

        if (nuevosDatos.getPassword() != null && !nuevosDatos.getPassword().trim().isEmpty())
            admin.setPassword(nuevosDatos.getPassword());

        return adminRepository.save(admin);
    }

    // Eliminar administrador por id
    public void eliminar(Long id) {
        if (!adminRepository.existsById(id))
            throw new RuntimeException("Administrador no encontrado con id: " + id);

        adminRepository.deleteById(id);
    }
}