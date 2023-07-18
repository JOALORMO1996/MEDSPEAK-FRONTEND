import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../components/login/LoginResponse';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(correo: string, contrasenia: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/autenticacion/login`;
    return this.http.post<LoginResponse>(url, { correo, contrasenia });
  }



  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.exp) {
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        return expirationDate.getTime() < Date.now();
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return true;
  }



  logout(): void {
    localStorage.removeItem('token');
  }
}
