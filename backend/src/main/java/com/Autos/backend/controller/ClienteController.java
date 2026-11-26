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

import com.Autos.backend.model.Cliente;
import com.Autos.backend.service.ClienteService;

@RestController
@RequestMapping("/api/Clientes")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // Endpoint tipo GET (Listar todos)
    @GetMapping
    public List<Cliente> listaClientes() {
        return clienteService.obtenerTodos();
    }

    // Endpoint tipo GET con id
    @GetMapping("/{id}")
    public Cliente obtenerPorId(@PathVariable Long id) {
        return clienteService.obtenerPorId(id);
    }

    // Endpoint tipo POST (Registrar nuevo cliente)
    @PostMapping
    public ResponseEntity<?> registrarCliente(@RequestBody Cliente cliente) {
        try {
            Cliente nuevo = clienteService.guardar(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Endpoint tipo POST para Iniciar Sesión
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Cliente credenciales) {
        Cliente clienteAutenticado = clienteService.autenticar(
            credenciales.getCorreo(),
            credenciales.getPassword()
        );

        if (clienteAutenticado != null) {
            return ResponseEntity.ok(clienteAutenticado);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Correo o contraseña incorrectos.");
    }

    // Endpoint tipo PUT con id
    @PutMapping("/{id}")
    public Cliente actualizaCliente(@PathVariable Long id, @RequestBody Cliente nuevosDatos) {
        return clienteService.actualizar(id, nuevosDatos);
    }

    // Endpoint tipo DELETE con id
    @DeleteMapping("/{id}")
    public void eliminarCliente(@PathVariable Long id) {
        clienteService.eliminar(id);
    }
}