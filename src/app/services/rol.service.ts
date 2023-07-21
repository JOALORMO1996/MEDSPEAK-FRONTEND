import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     return this.http.get<any>(this.apiUrl, { headers });
  }
}
