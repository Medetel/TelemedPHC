import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private HTTP: HttpClient) {

    }
   
}