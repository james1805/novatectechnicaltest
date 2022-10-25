package com.jamgar.app.rest.repository;

import com.jamgar.app.rest.entity.AlumnoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlumnoRepository extends JpaRepository<AlumnoEntity, Long> {
}
