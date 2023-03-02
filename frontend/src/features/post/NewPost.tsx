import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectUser} from "../user/usersSlice";
import ProductForm from "./components/PostForm";
import {createNewPost, fetchPosts} from "./postsThunk";
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
        await dispatch(createNewPost(post));
        await dispatch(fetchPosts());
        await navigate('/posts');
    };

    return (
            <ProductForm onSubmit={onFormSubmit}/>
    );
};

export default NewPost;