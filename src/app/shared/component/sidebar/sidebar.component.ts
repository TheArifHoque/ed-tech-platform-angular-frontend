import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean;
  showSidebar: boolean;
  isAdmin: boolean;

  userMenu: MenuItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Learning Dashboard', route: '/' },
    { label: 'Notification', route: '/' },
    { label: 'Manage Profile', route: '/' },
  ];
  adminMenu: MenuItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Dashboard', route: '/admin/dashboard' },
    { label: 'Profile', route: '/admin/general/profile' },
    { label: 'Notification', route: '/admin/notification' },
    { label: 'Payment Request', route: '/admin/payments' },
    { label: 'Statistics', route: '/admin/statistics' },
  ]

  constructor(private authService: AuthService) {
    this.isLoggedIn = false;
    this.showSidebar = false;
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.setLoginStatusAndLoadUserInfo();
  }

  setLoginStatusAndLoadUserInfo(): void {
    this.authService.isLoggedIn().subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
      if (this.isLoggedIn) {
        this.isAdmin = this.authService.isAdmin();
        // this.loadProfileData();
      }
    })
  }

  getUserName(): string {
    return this.authService.getUsername();
  }

  getActiveMenu(): MenuItem[] {
    if (this.isLoggedIn && this.isAdmin) {
      return this.adminMenu;
    } else if (this.isLoggedIn) {
      return this.userMenu;
    }
    return [];
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
