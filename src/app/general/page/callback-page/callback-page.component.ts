import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss'],
})
export class CallbackPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getUserId()) {
      this.router.navigate(['/']);
    } else {
      this.authService.redirectOnCallback();
    }
  }
}