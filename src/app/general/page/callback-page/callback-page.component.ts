import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrl: './callback-page.component.scss'
})
export class CallbackPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.redirectOnCallback();
  }
}
