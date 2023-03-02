import {RootState} from "../../app/store";
import {createSlice} from "@reduxjs/toolkit";
import {fetchPosts, getOnePost} from "./postsThunk";
import {PostApi} from "../../types";

interface PostsState {
    posts: PostApi[];
    postsFetchLoading: boolean;
    post: PostApi | null;
    onePostFetchLoading: boolean;
}

const initialState: PostsState = {
    posts: [],
    postsFetchLoading: false,
    post: null,
    onePostFetchLoading: false,
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
    }
});

export const postsReducer = postsSLice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsFetching = (state: RootState) => state.posts.postsFetchLoading;
export const selectOnePost = (state: RootState) => state.posts.post;
export const selectOnePostFetching = (state: RootState) => state.posts.onePostFetchLoading;