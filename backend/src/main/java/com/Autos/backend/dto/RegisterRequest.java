package com.Autos.backend.dto;

public record RegisterRequest(
        String nombre,
        String correo,
        String rut,
        String password
) {}