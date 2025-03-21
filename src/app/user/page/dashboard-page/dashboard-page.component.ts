import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { BackendApiService } from '../../../shared/service/backend-api.service';
import { CommonService } from '../../../shared/service/common.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  userId!: string;
  enrolledCourses: any[] = [];

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getEnrolledCourses();
  }

  private getEnrolledCourses(): void {
    this.backendApiService
      .callGetAllEnrolledCoursesAPI(this.userId)
      .subscribe((response) => {
        this.enrolledCourses = response.responseBody.enrolledCourseList;
        this.loadImages();
      });
  }

  private loadImages(): void {
    this.enrolledCourses.forEach((course) =>
      this.commonService
        .getImageFromImageUrl(course.imageUrl)
        .subscribe((safeUrl) => {
          course.image = safeUrl;
        })
    );
  }

  getFullname(): string {
    return this.authService.getFullname();
  }
}