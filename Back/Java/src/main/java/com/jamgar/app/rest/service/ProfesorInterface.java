package com.jamgar.app.rest.service;

import com.jamgar.app.rest.entity.AlumnoEntity;
import com.jamgar.app.rest.entity.ProfesorEntity;

import java.util.List;

public interface ProfesorInterface {

    public List<ProfesorEntity> getAllProfesores();

    public ProfesorEntity getByIdProfesor(Long id);

    public ProfesorEntity saveProfesor(ProfesorEntity profesorEntity);

    public ProfesorEntity updateProfesor(ProfesorEntity profesorEntity);

    public void deleteProfesor(Long id);
}
