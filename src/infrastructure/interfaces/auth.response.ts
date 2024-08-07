export interface AuthResponse {
    status:  boolean;
    message: string;
    data:    Data;
}

export interface Data {
    email:           string;
    fullName:        string;
    token:           string;
    refreshToken:    string;
    tokenExpiration: Date;
    roles:           string[];
}
