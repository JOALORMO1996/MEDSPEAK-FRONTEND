import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../components/login/LoginResponse';

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

  logout(): void {
    localStorage.removeItem('token');
  }
}
