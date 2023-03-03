import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {getOnePost} from "../features/post/postsThunk";
import {fetchCommentsById} from "../features/comment/commentsThunks";
import {selectOnePost, selectOnePostFetching} from "../features/post/postsSlice";
import {selectCommentsFetching} from "../features/comment/commentsSlice";
import PostItem from "../features/post/components/PostItem";
import Comments from "../features/comment/Comments";
import Spinner from "../components/UI/Spinner/Spinner";

const Post = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams() as { id: string };
    const post = useAppSelector(selectOnePost);
    const loading = useAppSelector(selectOnePostFetching);
    const commentsLoading = useAppSelector(selectCommentsFetching);

    useEffect(() => {
        dispatch(getOnePost(id));
        dispatch(fetchCommentsById(id));
    }, [dispatch, id]);

    return (
        <>
            {loading && <Spinner/>}
            {post && <PostItem post={post}/>}
            {commentsLoading && <Spinner/>}
            {<Comments postId={id}/>}
        </>
    );
};

export default Post;