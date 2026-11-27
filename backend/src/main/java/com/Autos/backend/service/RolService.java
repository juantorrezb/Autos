package com.Autos.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Autos.backend.model.Rol;
import com.Autos.backend.repository.RolRepository;

@Service
public class RolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public List<Rol> obtenerTodos() {
        return rolRepository.findAll();
    }

    public Rol crear(String nombre) {
        if (nombre == null || nombre.trim().isBlank())
            throw new IllegalArgumentException("El nombre del rol no puede estar vacío");

        String limpio = nombre.trim().toUpperCase();
        if (!limpio.startsWith("ROLE_"))
            limpio = "ROLE_" + limpio;

        if (rolRepository.findByNombre(limpio).isPresent())
            throw new IllegalArgumentException("El rol ya existe: " + limpio);

        return rolRepository.save(new Rol(limpio));
    }

    public void eliminar(Long id) {
        if (!rolRepository.existsById(id))
            throw new IllegalArgumentException("Rol no encontrado con id: " + id);
        rolRepository.deleteById(id);
    }
}