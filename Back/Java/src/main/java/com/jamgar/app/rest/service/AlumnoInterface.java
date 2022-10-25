package com.jamgar.app.rest.service;

import com.jamgar.app.rest.entity.AlumnoEntity;

import java.util.List;

public interface AlumnoInterface {

    public List<AlumnoEntity> getAllAlumnos();

    public AlumnoEntity getByIdAlumno(Long id);

    public AlumnoEntity saveAlumno(AlumnoEntity alumnoEntity);

    public AlumnoEntity updateAlumno(AlumnoEntity alumnoEntity);

    public void deleteAlumno(Long id);
}
