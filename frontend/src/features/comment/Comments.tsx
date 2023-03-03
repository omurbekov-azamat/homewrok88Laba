import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectComments} from "./commentsSlice";
import {Typography} from "@mui/material";
import CommentForm from "./components/CommentForm";
import CommentItems from "./components/CommentItems";
import {createComment,} from "./commentsThunks";
import {CommentMutation} from "../../types";

interface Props {
    postId: string;
}

const Comments: React.FC<Props> = ({postId}) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);

    let showComment = <Typography sx={{mt: 2, color: 'lightcoral'}}>There is no comments yet!</Typography>

    if (comments.length > 0) {
        showComment =  <CommentItems comments={comments}/>
    }

    const onSubmit = async (text: CommentMutation) => {
        const data = {
            post: postId,
            textComment: text.textComment,
        };
        await dispatch(createComment(data)).unwrap();
    };

    return (
        <>
            {showComment}
            <CommentForm onSubmit={onSubmit}/>
        </>
    );
};

export default Comments;