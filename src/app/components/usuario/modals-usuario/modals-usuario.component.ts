import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from './../../../models/rol';

@Component({
  selector: 'app-modals-usuario',
  templateUrl: './modals-usuario.component.html',
  styleUrls: ['./modals-usuario.component.scss']
})
export class ModalsUsuarioComponent implements OnInit{

  usuario: Usuario = new Usuario();
  roles: Rol[] = [];

  constructor(public dialogRef: MatDialogRef<ModalsUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private rolService: RolService) { }


  ngOnInit(): void {
    this.roles=this.data.rol
    this.rolService.getRoles().subscribe(data=>{
      this.roles=data;
    })
  }

  
  guardarUsuario() {
    const token = localStorage.getItem('token');
    if (token) {
    this.usuarioService.crearUsuario(this.usuario, token).subscribe(
      (response) => {
        console.log('Usuario creado exitosamente:', response);
       
        this.dialogRef.close();
        this.usuarioService.usuarioActualizar.next(this.data);
      },
      (error) => {
        
        console.error('Error al crear el usuario:', error);
      }
    );
  }else{
    console.error('El token no está presente en el local storage.');
  }
}
  

   onCancelClick(): void {
    this.dialogRef.close();
  }

}
