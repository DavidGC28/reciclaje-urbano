package com.examen.reciclaje.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.reciclaje.entidades.PuntoReciclaje;
import com.examen.reciclaje.repositories.PuntoReciclajeRepository;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "http://localhost:5173") 
public class PuntoReciclajeController {

    @Autowired
    private PuntoReciclajeRepository repository;

   
    @GetMapping
    public List<PuntoReciclaje> listarTodos() {
        return repository.findAll();
    }

  
    @PostMapping
    public ResponseEntity<PuntoReciclaje> guardarPunto(@RequestBody PuntoReciclaje nuevoPunto) {
        PuntoReciclaje guardado = repository.save(nuevoPunto);
        return new ResponseEntity<>(guardado, HttpStatus.CREATED);
    }
}
