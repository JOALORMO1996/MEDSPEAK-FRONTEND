import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/models/paciente';
import { faUserPen, faTrashCan, faCirclePlus, faMagnifyingGlass, faUserSlash, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { PacienteService } from 'src/app/services/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ModalPacienteComponent } from './modal-paciente/modal-paciente.component';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit{

  displayedColumns: string[] = ['identificacion', 'nombre', 'apellido', 'fecha_nacimiento', 'telefono', 'nombre_departamento', 'nombre_ciudad', 'direccion', 'nombre_estado_civil', 'ocupacion', 'asegurador', 'afiliacion', 'correo', 'estado', 'acciones'];
  pacientes: Paciente[] = []; 
  dataSource = new MatTableDataSource<Paciente>();
 
  
  //iconos
  edit = faUserPen;
  delete = faTrashCan;
  add = faCirclePlus;
  search = faMagnifyingGlass;
  disableUser = faUserSlash;
  activeUser = faUserCheck;

  activoColor = '#1FB101'; 
inactivoColor = '#FE1515'; 

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(
   private pacienteService: PacienteService,
   public dialog: MatDialog,
   private datePipe: DatePipe,
    private sweetAlertService: SweetAlertService){
  this.dataSource = new MatTableDataSource<Paciente>([]);
}


  ngOnInit() {
    this.getPacientes();
    

  }

  openModalPaciente() {
    const dialogRef = this.dialog.open(ModalPacienteComponent, {
      width: '600px', 
      data: { paciente: new Paciente(), esEdicion: false}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
      this.getPacientes();
    });
  }
  
  abrirModalEdicion(paciente: Paciente) {
    const fechaFormateada = this.formatearFecha(paciente.fecha_nacimiento);
    const dialogRef = this.dialog.open(ModalPacienteComponent, {
      width: '500px',
      data: {  paciente: { ...paciente, fecha_nacimientoString: fechaFormateada },  esEdicion: true } 
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('Modal cerrado');
      this.getPacientes(); 
    });
  }

  getPacientes() {
    this.pacienteService.getPacientes().subscribe(data => {
      this.pacientes = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; 
      if (this.paginator) {
        this.paginator.length = data.length;
      }
    });
  }

  obtenerEstadoPaciente(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  esActivo(paciente: Paciente): boolean {
    return paciente.estado === true;
  }

  obtenerFechaFormateada(fecha: string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(fecha, 'dd-MM-yyyy') || '';
  }


  formatearFecha(fecha: Date | null): string {
    if (fecha) {
      return this.datePipe.transform(fecha, 'yyyy-MM-dd') || '';
    }
    return '';
  }

  cambiarEstadoPaciente(paciente: Paciente, activar: boolean) {
    const token = localStorage.getItem('token');
    if (token) {
      const accion = activar ? 'activar' : 'inactivar';
      const mensajeConfirmacion = `¿Estás seguro de ${accion} este usuario?`;
  
      this.sweetAlertService.showConfirmation(mensajeConfirmacion, '').then((result) => {
        if (result.isConfirmed) {
          const servicio = activar ? this.pacienteService.activarPaciente : this.pacienteService.inactivarPaciente;
          servicio.call(this.pacienteService, paciente, token).subscribe(
            (response) => {
              this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje);
              this.getPacientes();
            },
            (error) => {
              this.sweetAlertService.showCustomMessage('error', 'Error', error.error.mensaje);
            }
          );
        }
      });
    } else {
      console.error('El token no está presente en el local storage.');
    }
  }

  buscarPaciente(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filtro = filterValue.trim().toLowerCase();
    this.dataSource.data = this.pacientes.filter(paciente =>
      paciente.identificacion.toString().includes(filtro) ||
      paciente.nombre.toLowerCase().includes(filtro) ||
      paciente.apellido.toLowerCase().includes(filtro)
    );
  }

 

}
