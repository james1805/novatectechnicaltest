import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Profesor } from '../interfaces/profesor';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css']
})
export class CrearProfesorComponent implements OnInit {

  form:any;
  profesor: Profesor = {
    codigo: "", 
    nombres: "", 
    apellidos: "",
    correo: "",
    planEstudios: "",
    id: 0
  }
  
  listaplanEstudios = ['Ingenieria', 'Ciencias de la Salud', 'Ciencias Basicas', 'Ciencias Empresariales'];
  isLoading = false;
  isModificate:boolean;
  title = "Crear Profesor";

  constructor(private formBuilder: FormBuilder,
    private profesorService: ProfesorService,
    private notificacionService:NotificacionService,
    private route:Router,
    private rutaActiva: ActivatedRoute) { 

      this.isModificate = profesorService.modificate;

    if (!this.isModificate) {
      this.form = this.formBuilder.group({
        codigo: ['', Validators.required],
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        planEstudios: ['', Validators.required],
        correo: ['', Validators.required, Validators.email],
      });
    } else {
      let profesor = profesorService.profesorSelect;
      this.title = "Modificar Profesor";
      this.form = this.formBuilder.group({
        codigo: [profesor.codigo, Validators.required],
        nombres: [profesor.nombres, Validators.required],
        apellidos: [profesor.apellidos, Validators.required],
        planEstudios: [profesor.planEstudios, Validators.required],
        correo: [profesor.correo, Validators.required, Validators.email]
      });
    }

    }

  ngOnInit(): void {
  }

  crearProfesor(){
    if (this.form.valid) {
      this.isLoading = true;
      this.profesor.codigo = this.form.value.codigo;
      this.profesor.nombres = this.form.value.nombres;
      this.profesor.apellidos = this.form.value.apellidos;
      this.profesor.correo = this.form.value.correo;
      this.profesor.planEstudios = this.form.value.planEstudios;

      console.log(this.profesor);
      this.profesorService.postInsertarProfesor(this.profesor).subscribe(resp => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Profesor',
          text: "Se ha creado el Profesor con exito",
          confirmButtonColor: '#F44336'
        })
        this.isLoading = false;
      }, error => {
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error,
          confirmButtonColor: '#F44336'
        })
        this.isLoading = false;
      })
      this.route.navigate(['/profesores']);
    }else{
      this.notificacionService.mostrarNotificacion("Faltan Campos Obligatorios por diligenciar", "error");
    }
  }

  modificarProfesor() {
    if (this.form.valid) {
      this.isLoading = true;
      this.profesor.codigo = this.form.value.codigo;
      this.profesor.nombres = this.form.value.nombres;
      this.profesor.apellidos = this.form.value.apellidos;
      this.profesor.correo = this.form.value.correo;
      this.profesor.planEstudios = this.form.value.planEstudios;
      this.profesor.id = this.profesorService.profesorSelect.id;

      console.log(this.profesor);
      this.profesorService.putModificarProfesor(this.profesor).subscribe(
        (resp) => {
          console.log(resp);
          this.profesorService.modificate = false;
          Swal.fire({
            icon: 'success',
            title: 'profesor',
            text: 'Se ha modificado el profesor con exito',
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
      this.route.navigate(['/profesores']);
    } else {
      this.notificacionService.mostrarNotificacion(
        'Faltan Campos Obligatorios por diligenciar',
        'error'
      );
    }
  }

  irAtras() {
    this.profesorService.modificate = false;
    this.route.navigate(['/profesores']);
  }

}
