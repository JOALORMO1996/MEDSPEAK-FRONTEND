import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { faHouse, faUsers, faHospitalUser, faLaptopMedical, faKey, faFileLines, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

//iconos
inicio = faHouse;
usuarios = faUsers;
pacientes = faHospitalUser;
consultas = faLaptopMedical;
roles = faKey;
reportes = faFileLines;
salir = faRightFromBracket;

isHovered = false;

onIconHover(isHovered: boolean): void {
  this.isHovered = isHovered;
}

  isMenuOpen: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}
  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  

}
