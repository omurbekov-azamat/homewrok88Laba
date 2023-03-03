import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectUser} from "../user/usersSlice";
import PostForm from "./components/PostForm";
import {createNewPost} from "./postsThunk";
import {PostMutation} from "../../types";


const NewPost = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/posts');
        }
    }, [user]);

    const onFormSubmit = async (post: PostMutation) => {
        await dispatch(createNewPost(post)).unwrap();
        await navigate('/posts');
    };

    return (
            <PostForm onSubmit={onFormSubmit}/>
    );
};

export default NewPost;