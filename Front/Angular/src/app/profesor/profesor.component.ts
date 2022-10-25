import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Profesor } from '../interfaces/profesor';
import { ProfesorService } from '../services/profesor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['codigo', 'nombres', 'apellidos', 'planEstudios', 'correo', 'id'];
  data_profesores:any = [];
  dataSource:MatTableDataSource<Profesor>;
  load:boolean;
  btnDisabled = false;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;


  constructor(private profesorService:ProfesorService, private route:Router) {
    this.load = false;
   }

   ngOnInit(): void {       
         this.cargarProfesores()
  }

  cargarProfesores(){
    this.profesorService.getProfesores().subscribe(resp => {
      console.log(resp);
      this.load = true;
      this.data_profesores = resp;      
      this.dataSource = new MatTableDataSource(this.data_profesores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.load = true;
      if(error.status === 401){
        this.route.navigate(['/profesores']);
        localStorage.clear();
      }
    }); 
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id:number){
    let profesorEliminar = this.data_profesores.filter((profesorEliminar:any) => profesorEliminar.id == id);
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Una vez eliminado no podra ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.profesorService.deleteEliminarProfesor(profesorEliminar[0].id).subscribe(resp=>{
          this.cargarProfesores();        
        }); 
        Swal.fire(
          'Eliminado!',
          'El Profesor ha sido eliminado.',
          'success'
        );
      }      
    });

     


  }

  modificar(id:number){
    let profesorModificar = this.data_profesores.filter((profesorModificar:any)=>{return profesorModificar.id == id});
    this.profesorService.profesorSelect = profesorModificar[0];
    this.profesorService.modificate = true;
    this.route.navigate(['/crear-profesor']);
  }


 

}


