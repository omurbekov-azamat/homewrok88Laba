import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectUser} from "../features/user/usersSlice";
import ProductForm from "../features/post/components/PostForm";
import {PostMutation} from "../types";
import {createNewPost} from "../features/post/postsThunk";

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
        await navigate('/posts');
    };

    return (
            <ProductForm onSubmit={onFormSubmit}/>
    );
};

export default NewPost;