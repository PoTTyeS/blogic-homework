import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IApiProps, IApiResponse } from 'src/interfaces/IApi';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    /* Variables */
    baseURL: string = "https://blogic-homework.vercel.app"; 

    constructor(private http: HttpClient) { }

    /**
     * Get Request
     * @param url Request url 
     * @returns response
     */
    get({ url }: IApiProps): any {
        return this.http.get<any>(`${this.baseURL}${url}`).toPromise().then((response: string) => {
            return response;
        }).catch((error: any) => this.handleError(url, error));
    };
    
    /**
     * Post Request
     * @param url Request url
     * @param data Post request data
     * @returns response
     */
    post({ url, data }: IApiProps): any {
        return this.http.post<any>(`${this.baseURL}${url}`, { data }).toPromise().then((response: string) => {
            return response;
        }).catch((error: any) => this.handleError(url, error))
    };

    /**
     * Error handler
     * @param operation 
     * @param result 
     * @returns Error
     */
    handleError<T>(operation: string = 'operation', result?: T) {
        return console.error(`Operation: ${operation} failed.. Result: ${JSON.stringify(result)}`);
    }

};