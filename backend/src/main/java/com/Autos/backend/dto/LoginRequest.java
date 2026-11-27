package com.Autos.backend.dto;


public record LoginRequest(
        String correo,
        String password
) {}