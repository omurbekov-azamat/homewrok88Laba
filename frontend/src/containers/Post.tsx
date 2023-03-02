import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {getOnePost} from "../features/post/postsThunk";
import {selectOnePost, selectOnePostFetching} from "../features/post/postsSlice";
import Spinner from "../components/UI/Spinner/Spinner";
import PostItem from "../features/post/components/PostItem";

const Post = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams() as { id: string };
    const post = useAppSelector(selectOnePost);
    const loading = useAppSelector(selectOnePostFetching);

    useEffect(() => {
        dispatch(getOnePost(id));
    }, [dispatch, id]);

    return (
        <>
            {loading && <Spinner/>}
            {post && <PostItem post={post}/>}
        </>
    );
};

export default Post;