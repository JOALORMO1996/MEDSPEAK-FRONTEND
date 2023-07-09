import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from './LoginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  correo: string = '';
  contrasenia: string = '';
  constructor(private loginService: LoginService, private router: Router){}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/inicio']);
    }
  }

  mensajeError: string = '';
  login() {
    this.loginService.login(this.correo, this.contrasenia)
    .subscribe(
      (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/inicio']);
      },
      (error) => {
        this.mensajeError = 'Error en el inicio de sesión';
      }
      );
  }



}
