import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  paymentMethod: string;
  paymentData: any;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private route: ActivatedRoute,
    private popNotificationService: PopNotificationService,
    private formBuilder: FormBuilder
  ) {
    this.paymentMethod = 'BANK_PAYMENT';
    this.paymentData = this.formBuilder.group({
      paymentVendor: ['', Validators.required],
      senderAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      trxId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['courseId'];
      if (courseId) {
        this.fetchCourseData(courseId);
      }
    });
  }

  fetchCourseData(courseId: string) {
    this.backendApiService
      .callGetCourseByIdAPI(courseId)
      .subscribe((response) => {
        this.courseData = response.responseBody.course;
      });
  }

  togglePaymentMethod(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
    this.paymentData.reset({ paymentVendor: '' });
  }

  savePaymentInfo(): void {
    const paymentInfo = {
      ...this.paymentData.value,
      userId: this.authService.getUserId(),
      courseId: this.courseData.courseId,
    };
    this.backendApiService.callSavePaymentInfoAPI(paymentInfo).subscribe({
      next: (successResponse) => {
        this.popNotificationService.setMessage(
          successResponse.responseBody.message
        );
        this.paymentData.reset();
      },
      error: (errorResponse) => {
        this.popNotificationService.setMessage(
          errorResponse.error.errorMessage
        );
      },
    });
  }
}