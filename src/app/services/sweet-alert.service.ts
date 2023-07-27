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
      confirmButtonColor: '#00C7E2',
      confirmButtonText: 'Cerrar',
    });
  }

  showError(message: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#00C7E2',
      confirmButtonText: 'Cerrar',
    });
  }

  showCustomMessage(icon: 'success' | 'error', title: string, message: string) {
    return Swal.fire({
      icon,
      title,
      text: message,
      confirmButtonColor: '#00C7E2',
      confirmButtonText: 'Cerrar',
    });
  }

  showConfirmation(title: string, text: string): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00C7E2',
      cancelButtonColor: '#BEBEBE',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
  }

}
