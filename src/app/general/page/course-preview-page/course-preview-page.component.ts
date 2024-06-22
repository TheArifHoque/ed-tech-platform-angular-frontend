import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../../shared/service/backend-api.service';
import { ActivatedRoute } from '@angular/router';
import { PopNotificationService } from '../../../shared/service/pop-notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-course-preview-page',
  templateUrl: './course-preview-page.component.html',
  styleUrl: './course-preview-page.component.scss'
})
export class CoursePreviewPageComponent implements OnInit {
  courseData: any;
  courseImage: any;

  constructor(
    private backendApiService: BackendApiService,
    private route: ActivatedRoute,
    private popNotificationService: PopNotificationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['courseId'];
      if (courseId) {
        this.fetchCoursePreview(courseId);
      }
    });
  }

  fetchCoursePreview(courseId: any): void {
    this.backendApiService.callGetCoursePreviewAPI(courseId).subscribe({
      next: (response) => {
        this.courseData = response.responseBody.coursePreview;
        this.loadImage(this.courseData.imageUrl);
      },
      error: (error) => {
        this.popNotificationService.error(error.error.errorMessage);
      },
    });
  }

  loadImage(imageUrl: string): void {
    this.getImage(imageUrl).subscribe({
      next: (image) => {
        this.courseImage = this.sanitizer.bypassSecurityTrustUrl(image);
      },
      error: (error) => console.error(error),
    });
  }

  getImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
  }
}
