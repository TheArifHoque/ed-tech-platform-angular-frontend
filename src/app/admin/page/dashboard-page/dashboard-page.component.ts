import { Component } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { CommonService } from '../../../shared/service/common.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  getFullname(): string {
    return this.authService.getFullname();
  }

  getAdminActionItems(): any[] {
    return this.commonService.getAdminActionItems();
  }
}