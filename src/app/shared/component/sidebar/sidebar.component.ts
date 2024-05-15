import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isLoggedIn: boolean;
  showSidebar: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = false;
    this.showSidebar = false;
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  login(): void {
    this.authService.login();
  }
}
