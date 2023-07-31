import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteActualizar = new Subject<Paciente[]>();

  private apiUrl = 'http://localhost:3000/paciente';


  constructor(private http: HttpClient) { }


  getPacientes(): Observable<any> {
    const token = localStorage.getItem('token');
     // Agregar el token en el encabezado de la solicitud
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.get<any>(this.apiUrl, { headers });
  }


  crearPaciente(paciente: Paciente, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/crearPaciente`;
    return this.http.post(url, paciente, { headers });
  }

  editarPaciente(paciente: Paciente, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/editarPaciente/${paciente.id}`;
    return this.http.put(url, paciente, { headers });
  }

  inactivarPaciente(paciente: Paciente, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/inactivarPaciente/${paciente.id}`;
    return this.http.put(url, paciente, { headers });
  }

  activarPaciente(paciente: Paciente, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/activarPaciente/${paciente.id}`;
    return this.http.put(url, paciente, { headers });
  }

}
