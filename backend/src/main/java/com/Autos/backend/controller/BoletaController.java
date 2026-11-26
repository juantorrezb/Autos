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
import com.Autos.backend.model.Boleta;
import com.Autos.backend.service.BoletaService;



@RestController

@RequestMapping("/api/Boletas")

@CrossOrigin(origins = "http://localhost:5173")

public class BoletaController {
@Autowired
private BoletaService boletaService;
@GetMapping
public List<Boleta> listarBoletas() {
    return boletaService.obtenerTodas();
}
@GetMapping("/{id}")
public Boleta obtenerPorId(@PathVariable Long id) {
    return boletaService.obtenerPorId(id);
}
@GetMapping("/cliente/{rut}")
public List<Boleta> obtenerPorRut(@PathVariable String rut) {
    return boletaService.obtenerPorRut(rut);

}
@PostMapping
public Boleta crearBoleta(@RequestBody Boleta boleta) {
    return boletaService.guardar(boleta);
}
@PutMapping("/{id}/estado")
public Boleta actualizarEstado(@PathVariable Long id, @RequestBody String estado) {
    return boletaService.actualizarEstado(id, estado);
}
@DeleteMapping("/{id}")
public void eliminarBoleta(@PathVariable Long id) {
    boletaService.eliminar(id);
}

}