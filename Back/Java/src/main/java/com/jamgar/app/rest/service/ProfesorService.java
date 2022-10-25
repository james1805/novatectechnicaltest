package com.jamgar.app.rest.service;

import com.jamgar.app.rest.entity.ProfesorEntity;
import com.jamgar.app.rest.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfesorService implements ProfesorInterface{

    @Autowired
    private ProfesorRepository profesorRepository;

    @Override
    public List<ProfesorEntity> getAllProfesores() {

        return (List<ProfesorEntity>) profesorRepository.findAll();
    }

    @Override
    public ProfesorEntity getByIdProfesor(Long id) {

        return profesorRepository.findById(id).isPresent()?
                profesorRepository.findById(id).orElseThrow(): null;
    }

    @Override
    public ProfesorEntity saveProfesor(ProfesorEntity profesorEntity) {

        return profesorRepository.save(profesorEntity);
    }

    @Override
    public ProfesorEntity updateProfesor(ProfesorEntity profesorEntity) {

        return profesorRepository.findById(profesorEntity.getId()).isPresent()?
                profesorRepository.save(profesorEntity): null;
    }

    @Override
    public void deleteProfesor(Long id) {

        profesorRepository.deleteById(id);
    }
}
