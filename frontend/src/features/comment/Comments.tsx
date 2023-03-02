import React from 'react';
import {useAppSelector} from "../../app/hook";
import {selectComments} from "./commentsSlice";
import {Typography} from "@mui/material";
import CommentForm from "./components/CommentForm";
import CommentItems from "./components/CommentItems";

const Comments = () => {
    const comments = useAppSelector(selectComments);

    let showComment = <Typography sx={{mt: 2, color: 'lightcoral'}}>There is no comments yet!</Typography>

    if (comments.length > 0) {
        showComment =  <CommentItems comments={comments}/>
    }

    return (
        <>
            {showComment}
            <CommentForm/>
        </>
    );
};

export default Comments;