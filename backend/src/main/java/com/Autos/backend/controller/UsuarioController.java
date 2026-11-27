package com.Autos.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Autos.backend.model.Usuario;
import com.Autos.backend.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") // Permite peticiones desde React
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

        //Endpoint tipo GET
    @GetMapping
    public List<Usuario> listaProductos(){
        return usuarioService.obtenerTodos();
    }
        //Endpoint tipo GET con id
    @GetMapping("/{id}")
    public Usuario obtenerPorId(@PathVariable Long id){
        return usuarioService.obtenerPorId(id);
    }
    //Endpoint tipo POST
    @PostMapping
    public Usuario creaProducto(@RequestBody Usuario producto){
        return usuarioService.guardar(producto);
    }
    @PutMapping("/{id}")
    public Usuario actualizaProducto(@PathVariable Long id,@RequestBody Usuario nuevosDatos){
        return usuarioService.actualizar(id, nuevosDatos);
    }

    @DeleteMapping
    public void eliminarProducto(@PathVariable Long id){
        usuarioService.eliminar(id);
    }
}
