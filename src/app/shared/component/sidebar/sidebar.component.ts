import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { BackendApiService } from '../../service/backend-api.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  showSidebar: boolean = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.updateLoggedInStatus();
  }

  updateLoggedInStatus(): void {
    this.authService.isLoggedIn().subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
      if (this.isLoggedIn) {
        this.isAdmin = this.authService.isAdmin();
      }
    });
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  getActiveMenu(): any[] {
    if (this.isLoggedIn && this.isAdmin) {
      return this.commonService.getAdminMenu();
    } else if (this.isLoggedIn) {
      return this.commonService.getUserMenu();
    } else {
      return [];
    }
  }

  getFullname(): string {
    return this.authService.getFullname();
  }
}