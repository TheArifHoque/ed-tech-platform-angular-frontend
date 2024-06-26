import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../../shared/service/auth.service';
import { BackendApiService } from '../../../shared/service/backend-api.service';
import { PopNotificationService } from '../../../shared/service/pop-notification.service';

@Component({
  selector: 'app-course-purchase-page',
  templateUrl: './course-purchase-page.component.html',
  styleUrls: ['./course-purchase-page.component.scss'],
})
export class CoursePurchasePageComponent implements OnInit {
  courseData: any;
  courseImage: any;
  paymentOption: string;
  paymentData: any;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private route: ActivatedRoute,
    private popNotificationService: PopNotificationService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.paymentOption = '';
    this.paymentData = this.formBuilder.group({
      paymentVendor: ['', Validators.required],
      senderAccount: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.min(100), Validators.max(100000)],
      ],
      trxId: ['', Validators.required],
    });
  }

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

  togglePaymentOption(paymentOption: string) {
    this.paymentOption = paymentOption;
    this.paymentData.reset({ paymentVendor: '' });
  }

  savePaymentInfo(): void {
    if (this.paymentData.valid) {
      const paymentInfo = {
        ...this.paymentData.value,
        userId: this.authService.getUserId(),
        courseId: this.courseData.courseId,
      };
      this.backendApiService.callSavePaymentAPI(paymentInfo).subscribe({
        next: (response) => {
          this.popNotificationService.success(response.responseBody.message);
          this.paymentData.reset();
        },
        error: (error) => {
          this.popNotificationService.error(error.error.errorMessage);
        },
      });
    }
  }
}