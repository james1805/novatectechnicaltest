import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profesor } from '../interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private url:string = "http://localhost:8080/";

  profesorSelect:Profesor;
  modificate:boolean;

  constructor(public http:HttpClient) { }

  public getProfesores(){
    return this.http.get(`${this.url}profesor`)
    .pipe(
      catchError(this.handleError)
    )
  }

  public putModificarProfesor(profesor:Profesor){
    return this.http.put(`${this.url}profesor/update`, profesor)
    .pipe(
      catchError(this.handleError)
    )
  }

  public postInsertarProfesor(profesor:Profesor){
    return this.http.post(`${this.url}profesor/insert`, profesor)
    .pipe(
      catchError(this.handleError)
    )
  }

  public deleteEliminarProfesor(id:number){
    return this.http.delete(`${this.url}profesor/delete/${id}`)
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
