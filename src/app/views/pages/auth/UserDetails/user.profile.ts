import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IProfile } from '../UserDetails/user.model'
@Injectable()
export class UserProfile {
    userProfile: IProfile = {
        access_token: "",
        expires_in: "",
        firstName: ""       
    };
    constructor(private router: Router) {
    }
    setProfile(profile: IProfile): void {
        localStorage.setItem('access_token', profile.access_token);
        localStorage.setItem('expires_in', profile.expires_in);
        localStorage.setItem('firstName', profile.firstName); 
    }

    getProfile(authorizationOnly: boolean = false): IProfile {
        var accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            this.userProfile.access_token = accessToken;
            this.userProfile.expires_in = localStorage.getItem('expires_in');
        }
        return this.userProfile;
    }
    resetProfile(): IProfile {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('firstName');   
        localStorage.removeItem('roleName');          
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('emailId');
        localStorage.removeItem('patient id');
        localStorage.removeItem('Id');   

        this.userProfile = {
            access_token: "",
            expires_in: "",
            firstName:""
        };
        return this.userProfile;
    }

}