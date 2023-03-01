import React, {useEffect} from 'react';
import {useAppDispatch} from "../app/hook";
import {fetchPosts} from "../features/post/postsThunk";

const Posts = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            Posts
        </div>
    );
};

export default Posts;