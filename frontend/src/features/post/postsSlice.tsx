import {RootState} from "../../app/store";
import {createSlice} from "@reduxjs/toolkit";
import {fetchPosts} from "./postsThunk";
import {PostApi} from "../../types";

interface PostsState {
    posts: PostApi[];
    postsFetchLoading: boolean;
}

const initialState: PostsState = {
    posts: [],
    postsFetchLoading: false,
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
            state.postsFetchLoading = false;
            state.posts = posts;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.postsFetchLoading = false;
        });
    }
});

export const postsReducer = postsSLice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsFetching = (state: RootState) => state.posts.postsFetchLoading