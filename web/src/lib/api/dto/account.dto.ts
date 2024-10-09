export interface LoginResponse {
    token: string;
}

export interface LoginVariables {
    username: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password?: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address?: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation?: {
            lat: string;
            long: string;
        };
    };
    phone?: string;
}

