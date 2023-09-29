import {Component,OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faUserPen, faTrashCan, faCirclePlus, faMagnifyingGlass, faUserSlash, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalsUsuarioComponent } from './modals-usuario/modals-usuario.component';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{
  displayedColumns: string[] = ['identificacion', 'nombre', 'apellido', 'telefono', 'direccion', 'correo', 'nombre_rol', 'estado', 'acciones'];
  usuarios: Usuario[] = []; 
  dataSource = new MatTableDataSource<Usuario>();
  
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

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog, private sweetAlertService: SweetAlertService){
    this.dataSource = new MatTableDataSource<Usuario>([]);
  }

  openModalUsuario() {
    const dialogRef = this.dialog.open(ModalsUsuarioComponent, {
      width: '600px', 
      data: {rol: [], usuario: new Usuario(), esEdicion: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
      this.getUsuarios();
    });
  }

  abrirModalEdicion(usuario: Usuario) {
    const dialogRef = this.dialog.open(ModalsUsuarioComponent, {
      width: '500px',
      data: {  usuario,  esEdicion: true } 
    });
    console.log('datos paciente ', usuario);
    dialogRef.afterClosed().subscribe(() => {
      console.log('Modal cerrado');
      this.getUsuarios(); 
    });
  }

  
  ngOnInit() {
   
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; 
      if (this.paginator) {
        this.paginator.length = data.length;
      }
    });
  }


  obtenerEstadoUsuario(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }


  esActivo(usuario: Usuario): boolean {
    return usuario.estado === true;
  }

 
  cambiarEstadoUsuario(usuario: Usuario, activar: boolean) {
    const token = localStorage.getItem('token');
    if (token) {
      const accion = activar ? 'activar' : 'inactivar';
      const mensajeConfirmacion = `¿Estás seguro de ${accion} este usuario?`;
  
      this.sweetAlertService.showConfirmation(mensajeConfirmacion, '').then((result) => {
        if (result.isConfirmed) {
          const servicio = activar ? this.usuarioService.activarUsuario : this.usuarioService.inactivarUsuario;
          servicio.call(this.usuarioService, usuario, token).subscribe(
            (response) => {
              this.sweetAlertService.showCustomMessage('success', 'Éxito', response.mensaje);
              this.getUsuarios();
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
  
  buscarUsuario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filtro = filterValue.trim().toLowerCase();
    this.dataSource.data = this.usuarios.filter(usuario =>
      usuario.identificacion.toString().includes(filtro) ||
      usuario.nombre.toLowerCase().includes(filtro) ||
      usuario.apellido.toLowerCase().includes(filtro)
    );
  }
  
}
