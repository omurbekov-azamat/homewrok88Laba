import {ObjectId} from "mongoose";

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface IPost {
    user: ObjectId;
    title: string;
    description: string;
    image: string;
    datetime: string;
}

export interface IComment {
    user: ObjectId;
    post: ObjectId;
    textComment: string;
}