import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentApi} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCommentsById = createAsyncThunk<CommentApi[], string>(
    'comments/fetchCommentsById',
    async (id) => {
        try {
            const response = await axiosApi.get<CommentApi[]>('/comments/' + id);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);