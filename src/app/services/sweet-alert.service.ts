import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }
 
  showSuccess(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Cerrar',
    });
  }

  showError(message: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Cerrar',
    });
  }

  showCustomMessage(icon: 'success' | 'error', title: string, message: string) {
    return Swal.fire({
      icon,
      title,
      text: message,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Cerrar',
    });
  }

}
