package com.Autos.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Autos.backend.model.Auto;
import com.Autos.backend.repository.AutoRepository;

@Service
public class AutoService {
    @Autowired
    private AutoRepository autoRepository;

    //Reglas de negoccio

    //Listar todos los autos
    public List<Auto> obtenerTodos(){
        return autoRepository.findAll();
    } 
    //Guardar un nuevo auto

    public Auto guardar(Auto auto){

        //Si es un auto que ya existe arrojo mensaje de error

        if(auto == null)
            throw new IllegalArgumentException("El producto no puede ser nulo");
        //Validacion del nombre
        if(auto.getNombre() == null || auto.getNombre().trim().isBlank())
            throw new IllegalArgumentException("El nombre no puede estar vacio");
        //Validacion del precio
        if(auto.getPrecio() <= 0f || auto.getPrecio() == null)
            throw new IllegalArgumentException("El precio no puede ser menor a 0 o ser nulo");
        //Validacion de la descrpcion
        if(auto.getDescripcion() == null || auto.getDescripcion().trim().isBlank())
            throw new IllegalArgumentException("La descripcion no puede ser nula o quedar vacia");
        //Validacion de la url de la imagen
        if(auto.getUrlImagen() == null || auto.getUrlImagen().trim().isBlank())
            throw new IllegalArgumentException("El url de la imagen no puede ser nulo o quedar vacio");
        //Si todo esta bien ingresado el auto se guarda

        return autoRepository.save(auto);
    }

       // Eliminacion del producto por id
    public void eliminar(Long id){
        // Si busco si existe el producto y no exixte lanzo excepcion
        if(autoRepository.existsById(id) == false)
            throw new RuntimeException("Producto no encontrado con id: " + id);
        // Si lo encontre lo elimino
        autoRepository.deleteById(id);
    }
}
