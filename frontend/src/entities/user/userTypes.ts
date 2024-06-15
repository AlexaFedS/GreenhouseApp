export interface RegistrationBody {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface UserData {
    id: number;
    username: string;
    email: string;
}

export interface LoginBody {
    username: string;
    password: string;
}

export interface LoginData {
    auth_token: string;
}
