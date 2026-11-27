package com.Autos.backend.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(nullable = false, unique = true)
    private String rut;

    @Column(nullable = false)
    private String password;

    // ManyToMany: Le indica a JPA que esta relación es de muchos a muchos.
    // fetch = FetchType.EAGER: Controla en qué momento Hibernate va a buscar 
    // los roles a la base de datos cuando consultas un usuario
    // EAGER (carga inmediata), apenas buscas un usuario por su correo para el 
    // login o para validar un JWT, Hibernate trae al usuario junto con todos 
    // sus roles al instante
    @ManyToMany(fetch = FetchType.EAGER)
    // Define la estructura física de la tabla intermedia que 
    // Hibernate creará en PostgreSQL:
    @JoinTable(
        // Nombre que tendrá la tabla puente en la base de datos
        name = "usuario_roles",
        // Crea la columna clave foránea (Foreign Key) que apunta a 
        // la entidad actual donde estás parado
        joinColumns = @JoinColumn(name = "usuario_id"),
        //Crea la columna clave foránea que apunta a la 
        // otra entidad de la relación (Rol).
        inverseJoinColumns = @JoinColumn(name = "rol_id")
    )
    // Un Set (conjunto) en Java no permite duplicados. 
    // Esto garantiza que un mismo usuario nunca tenga asignado 
    // dos veces el mismo rol (como dos veces ROLE_CLIENTE).
    private Set<Rol> roles = new HashSet<>(); // new HashSet<>() Para que el 
                                              // conjunto nazca vacío en lugar de null

    public Usuario() {}

    public Usuario(String nombre, String correo, String rut, String password) {
        this.nombre = nombre;
        this.correo = correo;
        this.rut = rut;
        this.password = password;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getRut() { return rut; }
    public void setRut(String rut) { this.rut = rut; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Set<Rol> getRoles() { return roles; }
    public void setRoles(Set<Rol> roles) { this.roles = roles; }
}