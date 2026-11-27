package com.Autos.backend.config; // <--- CAMBIAR por el paquete de tu proyecto


import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.Autos.backend.model.Rol;
import com.Autos.backend.repository.RolRepository;

// [FASE 5] Descomentar estos 3 imports cuando Spring Security esté configurado
// import com.telovendo.backend.model.Usuario;
// import com.telovendo.backend.repository.UsuarioRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RolRepository rolRepository;

    // [FASE 5] Descomentar estos 2 atributos
    // private final UsuarioRepository usuarioRepository;
    // private final PasswordEncoder passwordEncoder;

    // [FASE 1] Comentar este constructor al pasar a la Fase 5
    public DataInitializer(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    // [FASE 5] Descomentar este constructor (y comentar el de arriba)
    /*
    public DataInitializer(
            RolRepository rolRepository,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.rolRepository = rolRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }
    */

    @Override
    public void run(String... args) {
        // <--- MODIFICAR si tu proyecto usa otros roles (siempre con prefijo ROLE_)
        crearRolSiNoExiste("ROLE_CLIENTE");
        Rol rolAdmin = crearRolSiNoExiste("ROLE_ADMIN");

        // [FASE 5] Descomentar este bloque para crear el usuario ADMIN de prueba
        /*
        if (!usuarioRepository.existsByCorreo("admin@tuproyecto.cl")) {
            Usuario admin = new Usuario(
                    "Administrador",
                    "admin@tuproyecto.cl",
                    "11111111-1",
                    passwordEncoder.encode("admin123")
            );
            admin.getRoles().add(rolAdmin);
            usuarioRepository.save(admin);
        }
        */
    }

    private Rol crearRolSiNoExiste(String nombre) {
        return rolRepository.findByNombre(nombre)
                .orElseGet(() -> rolRepository.save(new Rol(nombre)));
    }
}