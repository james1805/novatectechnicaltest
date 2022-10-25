package com.jamgar.app.rest.controller;

import com.jamgar.app.rest.entity.AlumnoEntity;
import com.jamgar.app.rest.exceptions.RecordNotFoundException;
import com.jamgar.app.rest.service.AlumnoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping(value="/alumno")
public class AlumnoController {
    @Autowired
    private AlumnoInterface alumnoData;

    @GetMapping(produces = "application/json")
    public List<AlumnoEntity> getAlumnos(){
        return  alumnoData.getAllAlumnos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumnoEntity> getByIdAlumno(@PathVariable("id") Long id) {
        AlumnoEntity alumnoException = alumnoData.getByIdAlumno(id);
        if(alumnoException == null) {
            throw new RecordNotFoundException("User: ("  + id + ") not found");
        }
        return new ResponseEntity<>(alumnoException, HttpStatus.OK);
    }

    @PostMapping(path= "/insert", consumes = "application/json", produces = "application/json")
    public AlumnoEntity saveAlumnoData(@RequestBody AlumnoEntity alumnoEntity) {
        return alumnoData.saveAlumno(alumnoEntity);
    }

    @PutMapping("/update")
    public AlumnoEntity updateAlumnoData(@RequestBody AlumnoEntity alumnoEntity) {
        return alumnoData.updateAlumno(alumnoEntity);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAlumnoData(@PathVariable("id") Long id) {

        alumnoData.deleteAlumno(id);
    }

}
