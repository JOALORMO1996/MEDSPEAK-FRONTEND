import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,  private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.loginService.isTokenExpired(token)) {
      return true;
    } else {
      alert('La sesion ha caducado, por favor vuelva a loguearse.');
      this.loginService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
