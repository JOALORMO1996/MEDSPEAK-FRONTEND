import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router: Router, private loginService: LoginService) {}
  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
