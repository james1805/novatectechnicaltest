import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { AppComponent } from './app.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import { HomeComponent } from './home/home.component';
import { ProfesorComponent } from './profesor/profesor.component';

const routes: Routes = [
  { path: '', redirectTo: 'profesores', pathMatch: 'full' },  
  { path: 'profesores', component: ProfesorComponent},
  { path: 'alumnos', component: AlumnoComponent},
  { path: 'crear-alumno', component: CrearAlumnoComponent},  
  { path: 'crear-profesor', component: CrearProfesorComponent}, 
  { path: '**', redirectTo: 'profesores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
