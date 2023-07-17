import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    const token = localStorage.getItem('token');
     // Agregar el token en el encabezado de la solicitud
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.get<any>(this.apiUrl, { headers });
  }
}
