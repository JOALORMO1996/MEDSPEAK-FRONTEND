import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { RecuperarContraseniaService } from 'src/app/services/recuperar-contrasenia.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-restablecer-contrasenia',
  templateUrl: './restablecer-contrasenia.component.html',
  styleUrls: ['./restablecer-contrasenia.component.scss']
})
export class RestablecerContraseniaComponent implements OnInit{
  contrasenia: string = '';
  contrasenia2: string = '';
  token: string = '';

  constructor(private recuperarContraseniaService: RecuperarContraseniaService, 
    private sweetAlertService: SweetAlertService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  contraseniasCoinciden(): boolean {
    return this.contrasenia === this.contrasenia2;
  }

  restablecerContrasenia() {
    if (this.contraseniasCoinciden()) {
   
    this.recuperarContraseniaService.restablecerContrasenia(this.token, this.contrasenia).subscribe(
      (response) => {
        console.log(response);
        this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.sweetAlertService.showCustomMessage('error', 'Error', error.error.mensaje);
    
      }
    );
  }
}
  }

