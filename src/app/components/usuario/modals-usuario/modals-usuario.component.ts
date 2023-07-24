import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from './../../../models/rol';
import { NgForm } from '@angular/forms';
import { SweetAlertService} from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-modals-usuario',
  templateUrl: './modals-usuario.component.html',
  styleUrls: ['./modals-usuario.component.scss']
})
export class ModalsUsuarioComponent implements OnInit{

  usuario: Usuario = new Usuario();
  roles: Rol[] = [];
  esEdicion: boolean = false;
  

  constructor(public dialogRef: MatDialogRef<ModalsUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private sweetAlertService: SweetAlertService) { }


  ngOnInit(): void {
    this.roles=this.data.rol
    this.usuario = this.data.usuario;
    this.rolService.getRoles().subscribe(data=>{
      this.roles=data;
    })
    
    if (this.data && this.data.usuario) {
      this.usuario = this.data.usuario;
      this.esEdicion = this.data.esEdicion;
    }
  }

  
  guardarUsuario() {
    const token = localStorage.getItem('token');
  if (token) {
    if (this.esEdicion) { 
      this.usuarioService.editarUsuario(this.usuario, token).subscribe(
        (response) => {
          console.log('Usuario actualizado exitosamente:', response);
          this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje)
          .then(() => {
            // Cerrar la ventana emergente 
            this.dialogRef.close();
            this.usuarioService.usuarioActualizar.next(this.data);
          });
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
          // Mostrar ventana emergente de error (mensaje del back)
          this.sweetAlertService.showCustomMessage('error', 'Error', error.error.mensaje);
        }
      );
    } else {
      this.usuarioService.crearUsuario(this.usuario, token).subscribe(
        (response) => {
          console.log('Usuario creado exitosamente:', response);
          // Mostrar ventana emergente de éxito con mensaje personalizado desde el backend
          this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje)
            .then(() => {
              this.dialogRef.close();
              this.usuarioService.usuarioActualizar.next(this.data);
            });
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
          this.sweetAlertService.showCustomMessage('error', 'Error', error.error.mensaje);
        }
      );
    }
  } else {
    console.error('El token no está presente en el local storage.');
  }
}



  

   onCancelClick(): void {
    this.dialogRef.close();
  }


}
