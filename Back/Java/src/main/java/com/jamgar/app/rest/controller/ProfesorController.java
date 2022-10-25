package com.jamgar.app.rest.controller;

import com.jamgar.app.rest.entity.ProfesorEntity;
import com.jamgar.app.rest.exceptions.RecordNotFoundException;
import com.jamgar.app.rest.service.ProfesorInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping(value="/profesor")
public class ProfesorController {
    @Autowired
    private ProfesorInterface profesorData;

    @GetMapping(produces = "application/json")
    public List<ProfesorEntity> getProfesor(){
        return  profesorData.getAllProfesores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfesorEntity> getByIdProfesor(@PathVariable("id") Long id) {
        ProfesorEntity profesorException = profesorData.getByIdProfesor(id);
        if(profesorException == null) {
            throw new RecordNotFoundException("Profesor Id: ("  + id + ") not found");
        }
        return new ResponseEntity<>(profesorException, HttpStatus.OK);
    }

    @PostMapping(path= "/insert", consumes = "application/json", produces = "application/json")
    public ProfesorEntity saveProfesorData(@RequestBody ProfesorEntity profesorEntity) {
        return profesorData.saveProfesor(profesorEntity);
    }

    @PutMapping("/update")
    public ProfesorEntity updateProfesorData(@RequestBody ProfesorEntity profesorEntity) {
        return profesorData.updateProfesor(profesorEntity);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProfesorData(@PathVariable("id") Long id) {
        profesorData.deleteProfesor(id);
    }
}
