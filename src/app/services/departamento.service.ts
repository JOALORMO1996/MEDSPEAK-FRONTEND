import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = 'http://localhost:3000/departamentos';

  constructor(private http: HttpClient) { }


  getDepartamento(): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.get<any>(this.apiUrl, { headers });
  }
}
