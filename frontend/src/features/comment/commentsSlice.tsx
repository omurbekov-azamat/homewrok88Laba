import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createComment, fetchCommentsById} from "./commentsThunks";
import {CommentApi, ValidationError} from "../../types";

interface CommentsState {
    comments: CommentApi[];
    fetchCommentsLoading: boolean;
    createCommentLoading: boolean;
    createCommentError: ValidationError | null;
}

const initialState: CommentsState = {
    comments: [],
    fetchCommentsLoading: false,
    createCommentLoading: false,
    createCommentError: null,
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
        builder.addCase(createComment.pending, (state) => {
            state.createCommentError = null;
            state.createCommentLoading = true;
        });
        builder.addCase(createComment.fulfilled, (state) => {
            state.createCommentLoading = false;
        });
        builder.addCase(createComment.rejected, (state, {payload: error}) => {
            state.createCommentLoading = false;
            state.createCommentError = error || null;
        })
    },
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state:RootState) => state.comments.comments;
export const selectCommentsFetching = (state: RootState) => state.comments.fetchCommentsLoading;
export const selectCommentCreateLoading = (state: RootState) => state.comments.createCommentLoading;
export const selectCommentError = (state: RootState) => state.comments.createCommentError;