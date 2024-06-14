export interface IProfile {
    access_token: string;
    expires_in: string; 
    firstName: string;   
}

interface IClaim {
    type: string;
    value: string;
}

interface IUser {
    id: string;
    userName: string;
    email: string;
}