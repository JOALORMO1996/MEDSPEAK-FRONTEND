import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioActualizar = new Subject<Usuario[]>();

  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    const token = localStorage.getItem('token');
     // Agregar el token en el encabezado de la solicitud
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.get<any>(this.apiUrl, { headers });
  }

  crearUsuario(usuario: Usuario, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/crearUsuario`;
    return this.http.post(url, usuario, { headers });
  }

  editarUsuario(usuario: Usuario, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/editarUsuario/${usuario.id}`;
    return this.http.put(url, usuario, { headers });
  }

  inactivarUsuario(usuario: Usuario, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/inactivarUsuario/${usuario.id}`;
    return this.http.put(url, usuario, { headers });
  }

  activarUsuario(usuario: Usuario, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/activarUsuario/${usuario.id}`;
    return this.http.put(url, usuario, { headers });
  }
}
