import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.scss']
})
export class ModalPacienteComponent implements OnInit{

  paciente: Paciente = new Paciente();
  esEdicion: boolean = false;
  fechaNacimientoString = '';


  constructor(public dialogRef: MatDialogRef<ModalPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pacienteService: PacienteService,
    private sweetAlertService: SweetAlertService,
    ){

  }

  ngOnInit(): void {
this.paciente = this.data.paciente

if (this.data && this.data.paciente) {
  this.paciente = this.data.paciente;
  this.esEdicion = this.data.esEdicion;
   // Obtener el valor de la fecha del objeto paciente
   const fechaNacimientoISO = this.data.paciente.fecha_nacimiento;
   // Crear una instancia de Date con el valor ISO
   const fechaNacimientoDate = new Date(fechaNacimientoISO);
   // Convertir la fecha a formato yyyy-MM-dd
   this.fechaNacimientoString = fechaNacimientoDate.toISOString().substr(0, 10);
}
  }


  guardarPaciente() {
    this.data.paciente.fecha_nacimiento = new Date(this.data.paciente.fecha_nacimientoString);
    const token = localStorage.getItem('token');
  if (token) {
    if (this.esEdicion) { 
      this.pacienteService.editarPaciente(this.paciente, token).subscribe(
        (response) => {
          console.log('Paciente actualizado exitosamente:', response);
          this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje)
          .then(() => {
            // Cerrar la ventana emergente 
            this.dialogRef.close();
            this.pacienteService.pacienteActualizar.next(this.data);
          });
        },
        (error) => {
          console.error('Error al actualizar el paciente:', error);
          // Mostrar ventana emergente de error (mensaje del back)
          this.sweetAlertService.showCustomMessage('error', 'Error', error.error.mensaje);
        }
      );
    } else {
      this.pacienteService.crearPaciente(this.paciente, token).subscribe(
        (response) => {
          console.log('Paciente creado exitosamente:', response);
          this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje)
            .then(() => {
              this.dialogRef.close();
              this.pacienteService.pacienteActualizar.next(this.data);
            });
        },
        (error) => {
          console.error('Error al crear el paciente:', error);
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