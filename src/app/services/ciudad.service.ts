import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private apiUrl = 'http://localhost:3000/ciudades';

  constructor(private http: HttpClient) { }


  getCiudadesPorDepartamento(departamentoId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
   
    const url = `${this.apiUrl}/${departamentoId}`;
  
    return this.http.get<any>(url, { headers });
  }
}
