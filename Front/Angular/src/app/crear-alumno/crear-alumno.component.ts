import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Alumno } from '../interfaces/alumno';
import { AlumnoService } from '../services/alumno.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
})
export class CrearAlumnoComponent implements OnInit {
  form: any;
  alumno: Alumno = {
    codigo: '',
    nombres: '',
    apellidos: '',
    carrera: '',
    semestre: '',
    promedio: 0,
    correo: '',
    id: 0,
  };
  listaSemestres = ['Primero', 'Segundo', 'Tercero','Cuarto','Quinto', 'Sexto', 'Septimo','Octavo', 'Noveno','Decimo'];
  listaCarreras = ['Ingenieria de Sistemas', 'Ingenieria Civil', 'Ingenieria Industrial', 'Administracion de Empresas', 'Contaduria','Arquitectura','Derecho','Medicina'];
  isLoading = false;
  isModificate: boolean;
  title = "Crear Alumno";

  constructor(
    private formBuilder: FormBuilder,
    private alumnoService: AlumnoService,
    private notificacionService: NotificacionService,
    private route: Router,
  ) {
    this.isModificate = alumnoService.modificate;

    if (!this.isModificate) {
      this.form = this.formBuilder.group({
        codigo: ['', Validators.required],
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        carrera: ['', Validators.required],
        semestre: ['', Validators.required],
        promedio: ['', Validators.required],
        correo: ['', Validators.required]
      });
    } else {
      let alumno = alumnoService.alumnoSelect;
      this.title = "Modificar Alumno";
      this.form = this.formBuilder.group({
        codigo: [alumno.codigo, Validators.required],
        nombres: [alumno.nombres, Validators.required],
        apellidos: [alumno.apellidos, Validators.required],
        carrera: [alumno.carrera, Validators.required],
        semestre: [alumno.semestre, Validators.required],
        promedio: [alumno.promedio, Validators.required],
        correo: [alumno.correo, Validators.required]
      });
    }
  }

  ngOnInit(): void {}

  crearAlumno() {
    if (this.form.valid) {
      this.isLoading = true;
      this.alumno.codigo = this.form.value.codigo;
      this.alumno.nombres = this.form.value.nombres;
      this.alumno.apellidos = this.form.value.apellidos;
      this.alumno.carrera = this.form.value.carrera;
      this.alumno.promedio = this.form.value.promedio;
      this.alumno.correo = this.form.value.correo;
      this.alumno.semestre = this.form.value.semestre;

      console.log(this.alumno);
      this.alumnoService.postInsertarAlumnos(this.alumno).subscribe(
        (resp) => {
          console.log(resp);
          Swal.fire({
            icon: 'success',
            title: 'Alumno',
            text: 'Se ha creado el Alumno con exito',
            confirmButtonColor: '#F44336',
          });
          this.isLoading = false;          
        },
        (error) => {
          console.log(error.error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error,
            confirmButtonColor: '#F44336',
          });
          this.isLoading = false;
        }
      );
      this.route.navigate(['/alumnos']);
    } else {
      this.notificacionService.mostrarNotificacion(
        'Faltan Campos Obligatorios por diligenciar',
        'error'
      );
    }
  }

  modificarAlumno() {
    if (this.form.valid) {
      this.isLoading = true;
      this.alumno.codigo = this.form.value.codigo;
      this.alumno.nombres = this.form.value.nombres;
      this.alumno.apellidos = this.form.value.apellidos;
      this.alumno.carrera = this.form.value.carrera;
      this.alumno.promedio = this.form.value.promedio;
      this.alumno.correo = this.form.value.correo;
      this.alumno.semestre = this.form.value.semestre;
      this.alumno.id = this.alumnoService.alumnoSelect.id;

      console.log(this.alumno);
      this.alumnoService.putModificarAlumnos(this.alumno).subscribe(
        (resp) => {
          console.log(resp);
          this.alumnoService.modificate = false;
          Swal.fire({
            icon: 'success',
            title: 'Alumno',
            text: 'Se ha modificado el Alumno con exito',
            confirmButtonColor: '#F44336',
          });
          this.isLoading = false;
        },
        (error) => {
          console.log(error.error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error,
            confirmButtonColor: '#F44336',
          });
          this.isLoading = false;
        }
      );
      this.route.navigate(['/alumnos']);
    } else {
      this.notificacionService.mostrarNotificacion(
        'Faltan Campos Obligatorios por diligenciar',
        'error'
      );
    }
  }

  irAtras() {
    this.alumnoService.modificate = false;
    this.route.navigate(['/alumnos']);
  }
}
