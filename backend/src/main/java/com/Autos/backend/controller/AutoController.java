package com.Autos.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Autos.backend.model.Auto;
import com.Autos.backend.service.AutoService;

@RestController
@RequestMapping("/api/Autos")
@CrossOrigin(origins = "http://localhost:5173") // Permite peticiones desde React
public class AutoController {
    @Autowired
    private AutoService autoService;

        //Endpoint tipo GET
    @GetMapping
    public List<Auto> listaProductos(){
        return autoService.obtenerTodos();
    }
        //Endpoint tipo GET con id
    @GetMapping("/{id}")
    public Auto obtenerPorId(@PathVariable Long id){
        return autoService.ObtenerPorId(id);
    }
    //Endpoint tipo POST
    @PostMapping
    public Auto creaProducto(@RequestBody Auto producto){
        return autoService.guardar(producto);
    }

    @DeleteMapping
    public void eliminarProducto(@PathVariable Long id){
        autoService.eliminar(id);
    }
}
