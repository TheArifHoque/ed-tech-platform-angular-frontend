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
}