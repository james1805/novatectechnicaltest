package com.jamgar.app.rest.service;

import com.jamgar.app.rest.entity.AlumnoEntity;
import com.jamgar.app.rest.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoService implements AlumnoInterface{

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Override
    public List<AlumnoEntity> getAllAlumnos() {

        return (List<AlumnoEntity>) alumnoRepository.findAll();
    }

    @Override
    public AlumnoEntity getByIdAlumno(Long id) {

        return alumnoRepository.findById(id).isPresent()?
                alumnoRepository.findById(id).orElseThrow(): null;
    }

    @Override
    public AlumnoEntity saveAlumno(AlumnoEntity alumnoEntity) {

        return alumnoRepository.save(alumnoEntity);
    }

    @Override
    public AlumnoEntity updateAlumno(AlumnoEntity alumnoEntity) {

        return alumnoRepository.findById(alumnoEntity.getId()).isPresent()?
                alumnoRepository.save(alumnoEntity): null;
    }

    @Override
    public void deleteAlumno(Long id) {

        alumnoRepository.deleteById(id);
    }
}
