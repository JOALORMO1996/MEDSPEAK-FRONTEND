import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperarContraseniaService {

  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  enviarSolicitudRecuperacion(correo: string): Observable<any> {
    const url = `${this.apiUrl}/recuperarContrasenia`;
    return this.http.post(url,  { correo });
  }

  restablecerContrasenia(token: string, contrasenia: string): Observable<any> {
    const url = `${this.apiUrl}/restablecerContrasenia/${token}`;
    return this.http.post(url, { contrasenia });
  }
}
