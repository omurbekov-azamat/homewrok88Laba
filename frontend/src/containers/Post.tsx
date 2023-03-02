import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {getOnePost} from "../features/post/postsThunk";
import {selectOnePost, selectOnePostFetching} from "../features/post/postsSlice";
import Spinner from "../components/UI/Spinner/Spinner";
import PostItem from "../features/post/components/PostItem";
import {selectUser} from "../features/user/usersSlice";
import {fetchCommentsById} from "../features/comment/commentsThunks";
import CommentItems from "../features/comment/components/CommentItems";
import {selectComments, selectCommentsFetching} from "../features/comment/commentsSlice";
import {Typography} from "@mui/material";

const Post = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams() as { id: string };
    const user = useAppSelector(selectUser);
    const post = useAppSelector(selectOnePost);
    const loading = useAppSelector(selectOnePostFetching);
    const comments = useAppSelector(selectComments);
    const commentsLoading = useAppSelector(selectCommentsFetching);

    useEffect(() => {
        dispatch(getOnePost(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            dispatch(fetchCommentsById(id));
        }
    }, [user]);

    return (
        <>
            {loading && <Spinner/>}
            {post && <PostItem post={post}/>}
            {commentsLoading && <Spinner/>}
            {user ? (
                <CommentItems comments={comments}/>
            ) : (
                <Typography component='div' variant='h5' sx={{mt: 5}}>
                    You have to <strong style={{color: 'red'}}>Sign In</strong> to see comments
                </Typography>
            )}
        </>
    );
};

export default Post;