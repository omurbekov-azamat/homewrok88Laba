import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../app/hook";
import {selectUser} from "../features/user/usersSlice";
import ProductForm from "../features/post/components/PostForm";
import {PostMutation} from "../types";

const NewForm = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/posts');
        }
    }, [user]);

    const onFormSubmit = async (post: PostMutation) => {
        console.log(post);
    };

    return (
        <>
            <ProductForm onSubmit={onFormSubmit}/>
        </>
    );
};

export default NewForm;