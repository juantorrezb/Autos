package com.Autos.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Autos.backend.model.Auto;
import com.Autos.backend.service.AutoService;

@RestController
public class AutoController {
    @Autowired
    private AutoService autoService;

        //Endpoint tipo GET
    @GetMapping
    public List<Auto> listaProductos(){
        return autoService.obtenerTodos();
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
