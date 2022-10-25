import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Alumno } from '../interfaces/alumno';
import { AlumnoService } from '../services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
})
export class AlumnoComponent implements OnInit{
  displayedColumns: string[] = [
    'codigo',
    'nombres',
    'apellidos',
    'promedio',
    'semestre',
    'carrera',
    'correo',
    'id',
  ];
  data_alumnos: any = [];
  dataSource: MatTableDataSource<Alumno>;
  load: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private alumnoService: AlumnoService, private route: Router) {
    this.load = false;
  }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      (resp) => {
        console.log(resp);
        this.load = true;
        this.data_alumnos = resp;
        this.dataSource = new MatTableDataSource(this.data_alumnos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.load = true;
        if (error.status === 401) {
          this.route.navigate(['/profesores']);
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    let alumnoEliminar = this.data_alumnos.filter(
      (alumnoEliminar: any) => alumnoEliminar.id == id
    );
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Una vez eliminado no podra ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService
          .deleteEliminarAlumno(alumnoEliminar[0].id)
          .subscribe((resp) => {
            this.cargarAlumnos();
          });
        Swal.fire('Eliminado!', 'El Alumno ha sido eliminado.', 'success');
      }
    });
  }

  modificar(id: number) {
    let alumnoModificar = this.data_alumnos.filter((alumnoModificar: any) => {
      return alumnoModificar.id == id;
    });
    this.alumnoService.alumnoSelect = alumnoModificar[0];
    this.alumnoService.modificate = true;
    this.route.navigate(['/crear-alumno']);
  }
}
