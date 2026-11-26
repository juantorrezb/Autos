package com.Autos.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Autos.backend.model.Admin;
import com.Autos.backend.service.AdminService;

@RestController
@RequestMapping("/api/Admins")
@CrossOrigin(origins = "http://localhost:5173") // Permite peticiones desde React
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Endpoint tipo GET (Listar todos)
    @GetMapping
    public List<Admin> listaAdmins() {
        return adminService.obtenerTodos();
    }

    // Endpoint tipo GET con id
    @GetMapping("/{id}")
    public Admin obtenerPorId(@PathVariable Long id) {
        return adminService.obtenerPorId(id);
    }

    // Endpoint tipo POST (Crear administrador)
    @PostMapping
    public ResponseEntity<?> crearAdmin(@RequestBody Admin admin) {
        try {
            Admin nuevo = adminService.guardar(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Endpoint tipo POST para Iniciar Sesión de Admin
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin credenciales) {
        Admin adminAutenticado = adminService.autenticar(
            credenciales.getCorreo(),
            credenciales.getPassword()
        );

        if (adminAutenticado != null) {
            return ResponseEntity.ok(adminAutenticado);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Credenciales de administrador incorrectas.");
    }

    // Endpoint tipo PUT con id
    @PutMapping("/{id}")
    public Admin actualizarAdmin(@PathVariable Long id, @RequestBody Admin nuevosDatos) {
        return adminService.actualizar(id, nuevosDatos);
    }

    // Endpoint tipo DELETE con id
    @DeleteMapping("/{id}")
    public void eliminarAdmin(@PathVariable Long id) {
        adminService.eliminar(id);
    }
}