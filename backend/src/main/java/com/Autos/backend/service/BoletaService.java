package com.Autos.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Autos.backend.model.Auto;
import com.Autos.backend.model.Boleta;
import com.Autos.backend.repository.AutoRepository;
import com.Autos.backend.repository.BoletaRepository;

@Service
public class BoletaService {

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private AutoRepository autoRepository;

    // Listar todas las boletas
    public List<Boleta> obtenerTodas() {
        return boletaRepository.findAll();
    }

    // Obtener boleta por id
    public Boleta obtenerPorId(Long id) {
        return boletaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Boleta no encontrada con id: " + id));
    }

    // Obtener historial de boletas por RUT del cliente
    public List<Boleta> obtenerPorRut(String rut) {
        return boletaRepository.findByRutCliente(rut);
    }

    // Guardar nueva boleta
    public Boleta guardar(Boleta boleta) {
        if (boleta == null) {
            throw new IllegalArgumentException("La boleta no puede ser nula");
        }
        if (boleta.getNombreCliente() == null || boleta.getNombreCliente().trim().isBlank()) {
            throw new IllegalArgumentException("El nombre del titular es obligatorio");
        }
        if (boleta.getRutCliente() == null || boleta.getRutCliente().trim().isBlank()) {
            throw new IllegalArgumentException("El RUT del cliente es obligatorio");
        }
        if (boleta.getAutos() == null || boleta.getAutos().isEmpty()) {
            throw new IllegalArgumentException("La boleta debe incluir al menos un vehículo");
        }

        // Validamos que los autos existan en la BD y calculamos el total real desde el backend
        List<Auto> autosVerificados = new ArrayList<>();
        float totalCalculado = 0f;

        for (Auto item : boleta.getAutos()) {
            if (item.getId() == null) {
                throw new IllegalArgumentException("Cada vehículo debe incluir su id");
            }
            Auto autoDb = autoRepository.findById(item.getId())
                    .orElseThrow(() -> new RuntimeException("Auto no encontrado con id: " + item.getId()));
            autosVerificados.add(autoDb);
            totalCalculado += autoDb.getPrecio();
        }

        boleta.setNombreCliente(boleta.getNombreCliente().trim());
        boleta.setRutCliente(boleta.getRutCliente().trim());
        boleta.setAutos(autosVerificados);
        boleta.setTotal(totalCalculado);

        // Si viene la tarjeta completa desde React, guardamos solo los últimos 4 dígitos
        if (boleta.getUltimosDigitosTarjeta() != null && !boleta.getUltimosDigitosTarjeta().trim().isBlank()) {
            String limpia = boleta.getUltimosDigitosTarjeta().replaceAll("[\\s-]", "");
            if (limpia.length() >= 4) {
                boleta.setUltimosDigitosTarjeta(limpia.substring(limpia.length() - 4));
            } else {
                boleta.setUltimosDigitosTarjeta("0000");
            }
        } else {
            boleta.setUltimosDigitosTarjeta("0000");
        }

        return boletaRepository.save(boleta);
    }

    // Actualizar estado de la boleta
    public Boleta actualizarEstado(Long id, String nuevoEstado) {
        Boleta boleta = obtenerPorId(id);
        if (nuevoEstado == null || nuevoEstado.trim().isBlank()) {
            throw new IllegalArgumentException("El estado no puede estar vacío");
        }
        boleta.setEstado(nuevoEstado.trim());
        return boletaRepository.save(boleta);
    }

    // Eliminar boleta por id
    public void eliminar(Long id) {
        if (!boletaRepository.existsById(id)) {
            throw new RuntimeException("Boleta no encontrada con id: " + id);
        }
        boletaRepository.deleteById(id);
    }
}