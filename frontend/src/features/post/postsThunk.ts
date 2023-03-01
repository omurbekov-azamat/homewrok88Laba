import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {PostApi} from "../../types";

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