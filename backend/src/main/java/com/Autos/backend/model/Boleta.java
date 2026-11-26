package com.Autos.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "boletas")
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombreCliente;

    @Column(nullable = false)
    private String rutCliente;

    @Column(nullable = false)
    private String ultimosDigitosTarjeta;

    @Column(nullable = false)
    private Float total;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false)
    private LocalDateTime fechaEmision;

    @ManyToMany
    @JoinTable(
        name = "boleta_autos",
        joinColumns = @JoinColumn(name = "boleta_id"),
        inverseJoinColumns = @JoinColumn(name = "auto_id")
    )
    private List<Auto> autos;

    @PrePersist
    public void prePersist() {
        this.fechaEmision = LocalDateTime.now();
        if (this.estado == null || this.estado.isBlank()) {
            this.estado = "Confirmado";
        }
    }

    // Constructor vacío
    public Boleta() {
    }

    // Constructor
    public Boleta(String nombreCliente, String rutCliente, String ultimosDigitosTarjeta, Float total, String estado, List<Auto> autos) {
        this.nombreCliente = nombreCliente;
        this.rutCliente = rutCliente;
        this.ultimosDigitosTarjeta = ultimosDigitosTarjeta;
        this.total = total;
        this.estado = estado;
        this.autos = autos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getRutCliente() {
        return rutCliente;
    }

    public void setRutCliente(String rutCliente) {
        this.rutCliente = rutCliente;
    }

    public String getUltimosDigitosTarjeta() {
        return ultimosDigitosTarjeta;
    }

    public void setUltimosDigitosTarjeta(String ultimosDigitosTarjeta) {
        this.ultimosDigitosTarjeta = ultimosDigitosTarjeta;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDateTime fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public List<Auto> getAutos() {
        return autos;
    }

    public void setAutos(List<Auto> autos) {
        this.autos = autos;
    }
}