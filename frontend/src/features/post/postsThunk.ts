import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AppDispatch, RootState} from "../../app/store";
import {isAxiosError} from "axios";
import {PostApi, PostMutation, ValidationError} from "../../types";

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

export const createNewPost = createAsyncThunk<void, PostMutation, {state: RootState, rejectValue: ValidationError, dispatch: AppDispatch}>(
    'posts/createNewPost',
    async (postMutation, {getState, rejectWithValue, dispatch}) => {
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
                await dispatch(fetchPosts());
            }
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }

            throw e;
        }
    }
);

export const getOnePost = createAsyncThunk<PostApi, string>(
    'posts/getOnePost',
    async (id) => {
        try {
            const response = await axiosApi.get<PostApi>('/posts/' + id);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
)