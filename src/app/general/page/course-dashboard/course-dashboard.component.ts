import { Component } from '@angular/core';
import { BackendApiService } from '../../../shared/service/backend-api.service';
import { ActivatedRoute } from '@angular/router';
import { PopNotificationService } from '../../../shared/service/pop-notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrl: './course-dashboard.component.scss'
})
export class CourseDashboardComponent {
  courseId: string | null = null;
  course: any;
  courseContents: any[] = [];
  contentDataForm: any;
  
  constructor(
    private backendApiService: BackendApiService,
    private route: ActivatedRoute,
    private popNotificationService: PopNotificationService,
    private sanitizer: DomSanitizer,
  ) {}

  fetchCourseDetails(courseId: string): void {
    this.backendApiService.callGetCourseAPI(courseId).subscribe({
      next: (response) => {
        this.course = response.responseBody.course;
        if (this.course.imageUrl) {
          this.loadCourseImage(this.course.imageUrl);
        }
      },
      error: (error) => {
        this.popNotificationService.error(error.error.errorMessage);
      },
    });
  }

  fetchCourseContents(courseId: string): void {
    this.backendApiService.callGetCourseContentsAPI(courseId).subscribe({
      next: (response) => {
        this.courseContents = response.responseBody.courseContents;
      },
      error: (error) => {
        this.popNotificationService.error(error.error.errorMessage);
      },
    });
  }

  loadCourseImage(imageUrl: string): void {
    this.getCourseImage(imageUrl).subscribe({
      next: (image) => {
        this.course.image = this.sanitizer.bypassSecurityTrustUrl(image);
      },
      error: (error) => console.error(error),
    });
  }

  getCourseImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
  }

  saveContentData(): void {}
}
