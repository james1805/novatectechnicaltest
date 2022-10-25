import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {  

  constructor(private snackBar: MatSnackBar) { }

  mostrarNotificacion(mensaje: string, tipoError: string) {
    this.snackBar.open(mensaje, '' ,{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: tipoError
    });
  }

}

