import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { BackendApiService } from '../../../shared/service/backend-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  enrolledCourses: any[];

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {
    this.enrolledCourses = [];
  }

  ngOnInit(): void {
    this.fetchEnrolledCourses();
  }

  fetchEnrolledCourses(): void {
    this.backendApiService
      .callGetEnrolledCoursesAPI(this.authService.getUserId())
      .subscribe({
        next: (response) => {
          this.enrolledCourses = response.responseBody.courseList;
          this.loadImages();
        },
        error: (error) => console.error(error),
      });
  }

  loadImages(): void {
    this.enrolledCourses.forEach((course) => {
      this.getImage(course.imageUrl).subscribe({
        next: (image) => {
          course.image = this.sanitizer.bypassSecurityTrustUrl(image);
        },
        error: (error) => console.error(error),
      });
    });
  }

  getImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
  }
}
