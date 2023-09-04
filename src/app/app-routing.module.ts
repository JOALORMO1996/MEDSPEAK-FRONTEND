import {Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecuperarContraseniaComponent } from './components/recuperar-contrasenia/recuperar-contrasenia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guards';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { RestablecerContraseniaComponent } from './components/restablecer-contrasenia/restablecer-contrasenia.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'recuperarContrasenia', component: RecuperarContraseniaComponent},
  {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  {path: 'usuarios', component: UsuarioComponent,  canActivate: [AuthGuard]},
  {path: 'pacientes', component: PacienteComponent, canActivate: [AuthGuard]},
  {path: 'restablecerContrasenia/:token', component: RestablecerContraseniaComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
