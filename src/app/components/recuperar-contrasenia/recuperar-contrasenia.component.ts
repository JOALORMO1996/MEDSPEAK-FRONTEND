import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RecuperarContraseniaService } from 'src/app/services/recuperar-contrasenia.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.scss']
})
export class RecuperarContraseniaComponent {
  correo: string = '';
  resultadoMensaje: string = '';

  constructor(private recuperarContraseniaService: RecuperarContraseniaService,  private sweetAlertService: SweetAlertService, private router: Router){

  }
  enviarSolicitud() {
    if (this.correo) {
      this.recuperarContraseniaService.enviarSolicitudRecuperacion(this.correo).subscribe(
        (response) => {
          this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje)
          this.router.navigate(['/login']);
        },
        (error) => {
          this.sweetAlertService.showCustomMessage('error', 'Error', error.error.mensaje);
        }
      );
    }
  }
}
