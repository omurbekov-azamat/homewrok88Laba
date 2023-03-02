import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchCommentsById} from "./commentsThunks";
import {CommentApi} from "../../types";

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
            state.comments = [];
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

export const selectComments = (state:RootState) => state.comments.comments;
export const selectCommentsFetching = (state: RootState) => state.comments.fetchCommentsLoading;