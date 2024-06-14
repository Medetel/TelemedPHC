import { Injectable } from '@angular/core';
@Injectable()
export class GlobalStorage {
    constructor() { }

    get_access_token() {
        return localStorage.getItem('access_token');
    }
    get_expires_in() {
        return localStorage.getItem('expires_in');
    }
}