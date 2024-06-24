import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BackendApiService {
    private baseUrl = 'http://localhost:9191';

    constructor(private httpClient: HttpClient) {}

    callGetUserDataAPI(userId: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/profile-page-api/${userId}`);
    }

    callGetContentAPI(contentUrl: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/content-api/${contentUrl}`, {
            responseType: 'arraybuffer',
        });
    }

    callSaveContentAPI(contents: any[]): Observable<any> {
        const formData = new FormData();
        contents.forEach((content) => {
            formData.append('contents', content);
        });

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.httpClient.post(`${this.baseUrl}/content-api`, formData, {
            headers: headers,
        });
    }

    callGetCourseListAPI(pageNumber: number, limit: number): Observable<any> {
        return this.httpClient.get(
            `${this.baseUrl}/course-page-api?pageNumber=${pageNumber}&limit=${limit}`
        );
    }

    callHomePageAPI(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/home-page-api`);
    }

    callGetCourseAPI(courseId: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/course-page-api/${courseId}`);
    }

    callGetCoursePreviewAPI(courseId: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/course-page-api/${courseId}/preview`);
    }

    callCreateCourseAPI(courseData: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/course-page-api`,courseData);
    }

    callUpdateCourseAPI(courseData: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/course-page-api/update`,courseData);
    }

    callUpdateUserDataAPI(userData: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/profile-page-api`,userData);
    }

    callUpdateUserImageAPI(userId: string, image: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', image);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.httpClient.post(
            `${this.baseUrl}/profile-page-api/image/${userId}`,
            formData,
            {headers: headers}
        );
    }

    callUpdatePasswordAPI(userId: string, password: string): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/profile-page-api/password`,{
            userId: userId,
            password: password,
        });
    }

    callSavePaymentAPI(paymentInfo: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/payment-api`, paymentInfo);
    }

    callGetPaymentsAPI(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/payment-api`);
    }

    callUpdatePaymentStatusAPI(paymentStatusMap: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/payment-api/approval`,paymentStatusMap);
    }
}