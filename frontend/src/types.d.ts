export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export type GlobalError = {
    error: string;
}

export interface PostApi {
    _id: string;
    user: {
        _id: string;
        username: string;
    },
    title: string;
    description: string | null;
    image: string | null;
    datetime: string;
}

export interface PostMutation {
    title: string;
    description: string;
    image: File | null;
}