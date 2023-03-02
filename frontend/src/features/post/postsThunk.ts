import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {PostApi, PostMutation} from "../../types";

export const fetchPosts = createAsyncThunk<PostApi[], void>(
    'posts/fetchAll',
    async () => {
        let posts: PostApi[] = [];
        try {
            const response = await axiosApi.get<PostApi[]>('/posts');
            posts = response.data;
            return posts;
        } catch (e) {
            throw e;
        }
    }
);

export const createNewPost = createAsyncThunk<void, PostMutation, {state: RootState}>(
    'posts/createNewPost',
    async (postMutation, {getState}) => {
        const user = getState().users.user;
        try {
            if (user) {
                const formData = new FormData();
                const keys = Object.keys(postMutation) as (keyof PostMutation)[];

                keys.forEach(key => {
                    const value = postMutation[key];

                    if (value !== null) {
                        formData.append(key, value);
                    }
                });

                await axiosApi.post('/posts', formData, {headers: {'Authorization': user.token}});
            }
        } catch (e) {
            throw e;
        }
    }
);