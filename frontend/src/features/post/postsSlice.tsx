import {RootState} from "../../app/store";
import {createSlice} from "@reduxjs/toolkit";
import {createNewPost, fetchPosts, getOnePost} from "./postsThunk";
import {PostApi, ValidationError} from "../../types";

interface PostsState {
    posts: PostApi[];
    postsFetchLoading: boolean;
    post: PostApi | null;
    onePostFetchLoading: boolean;
    newPostLoading: boolean;
    postError: ValidationError | null;
}

const initialState: PostsState = {
    posts: [],
    postsFetchLoading: false,
    post: null,
    onePostFetchLoading: false,
    newPostLoading: false,
    postError: null,
}

export const postsSLice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.postsFetchLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
            state.post = null;
            state.postsFetchLoading = false;
            state.posts = posts;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.postsFetchLoading = false;
        });
        builder.addCase(getOnePost.pending, (state) => {
            state.onePostFetchLoading = true;
        });
        builder.addCase(getOnePost.fulfilled, (state, {payload: post}) => {
            state.onePostFetchLoading = false;
            state.post = post;
        });
        builder.addCase(getOnePost.rejected, (state) => {
            state.onePostFetchLoading = false;
        });
        builder.addCase(createNewPost.pending, (state) => {
            state.postError = null;
            state.newPostLoading = true;
        });
        builder.addCase(createNewPost.fulfilled, (state) => {
            state.newPostLoading = false;
        });
        builder.addCase(createNewPost.rejected, (state, {payload: error}) => {
            state.newPostLoading = false;
            state.postError = error || null;
        });
    }
});

export const postsReducer = postsSLice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsFetching = (state: RootState) => state.posts.postsFetchLoading;
export const selectOnePost = (state: RootState) => state.posts.post;
export const selectOnePostFetching = (state: RootState) => state.posts.onePostFetchLoading;
export const selectPostError = (state: RootState) => state.posts.postError;
export const selectCreatePostLoading = (state: RootState) => state.posts.newPostLoading;