import {CommentApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCommentsById} from "./commentsThunks";

interface CommentsState {
    comments: CommentApi[];
    fetchCommentsLoading: boolean;
}

const initialState: CommentsState = {
    comments: [],
    fetchCommentsLoading: false,
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCommentsById.pending, (state) => {
            state.fetchCommentsLoading = true;
        });
        builder.addCase(fetchCommentsById.fulfilled, (state, {payload: comments}) => {
            state.fetchCommentsLoading = false;
            state.comments = comments;
        });
        builder.addCase(fetchCommentsById.rejected, (state) => {
            state.fetchCommentsLoading = false;
        });
    },
});

export const commentsReducer = commentsSlice.reducer;