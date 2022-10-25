import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alumno } from '../interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private url:string = "http://localhost:8080/";

  alumnoSelect:Alumno;
  modificate:boolean;

  constructor(public http:HttpClient) { }

  public getAlumnos(){
    return this.http.get(`${this.url}alumno`)
    .pipe(
      catchError(this.handleError)
    )
  }

  public putModificarAlumnos(alumno:Alumno){
    return this.http.put(`${this.url}alumno/update`, alumno)
    .pipe(
      catchError(this.handleError)
    )
  }

  public postInsertarAlumnos(alumno:Alumno){
    return this.http.post(`${this.url}alumno/insert`, alumno)
    .pipe(
      catchError(this.handleError)
    )
  }

  public deleteEliminarAlumno(id:number){
    return this.http.delete(`${this.url}alumno/delete/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }  

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
