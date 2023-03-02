import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectPosts, selectPostsFetching} from "../features/post/postsSlice";
import {fetchPosts} from "../features/post/postsThunk";
import {Outlet} from "react-router-dom";
import PostItems from "../features/post/components/PostItems";
import Spinner from "../components/UI/Spinner/Spinner";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectPostsFetching);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>
            {loading && <Spinner/>}
            <Outlet/>
            <PostItems posts={posts}/>
        </>
    );
};

export default Posts;