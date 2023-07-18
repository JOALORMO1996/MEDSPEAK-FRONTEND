import {Component,OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import {  faUserPen, faTrashCan, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono', 'direccion', 'correo', 'nombre_rol', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();
  edit = faUserPen;
  delete = faTrashCan;
  add = faCirclePlus;
  search = faMagnifyingGlass;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService){}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
