import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MenuItem } from '../../model/menu-item';
import { BackendApiService } from '../../service/backend-api.service';
import { Observable, map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean;
  showSidebar: boolean;
  isAdmin: boolean;
  userImage: any;

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

  constructor(
    private authService: AuthService, 
    private backendApiService: BackendApiService, 
    private sanitizer: DomSanitizer) {
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
        this.loadProfileData();
      }
    })
  }

  loadProfileData(): void {
    this.backendApiService
    .callGetUserDataAPI(this.authService.getUserId())
    .subscribe({
      next: (response) => {
        const userData = response?.responseBody?.user || [];
        this.loadImage(userData.imageUrl);
      },
      error: (error) => console.error(error),
    });
  }

  loadImage(imageUrl: string): void {
    this.getImage(imageUrl).subscribe({
      next: (image) => {
        this.userImage = this.sanitizer.bypassSecurityTrustUrl(image);
      },
      error: (error) => console.error(error),
    });
  }

  getImage(imageUrl: string): Observable<string> {
    return this.backendApiService
    .callGetContentAPI(imageUrl)
    .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
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
