import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isLoggedIn: boolean;
  showSidebar: boolean;

  constructor() {
    this.isLoggedIn = false;
    this.showSidebar = false;
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
