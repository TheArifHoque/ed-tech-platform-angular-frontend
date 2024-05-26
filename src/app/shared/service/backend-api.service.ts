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

    callGetContentAPI(contentURL: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/content-api/${contentURL}`, {
            responseType: 'arraybuffer',
        });
    }

    callHomePageAPI(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/home-page-api`);
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
}