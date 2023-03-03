import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {CommentApi, ValidationError} from "../../types";
import {AppDispatch, RootState} from "../../app/store";
import {isAxiosError} from "axios";

interface PropsMutations {
    post: string;
    textComment: string;
}

export const createComment = createAsyncThunk<void, PropsMutations, { state: RootState, rejectValue: ValidationError, dispatch: AppDispatch }>(
    'comments/createComment',
    async (data, {getState, rejectWithValue, dispatch}) => {
        const user = getState().users.user;
        try {
            if (user) {
                await axiosApi.post('/comments', data, {headers: {'Authorization': user.token}});
                await dispatch(fetchCommentsById(data.post));
            }
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

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