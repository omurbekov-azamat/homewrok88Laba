import React from 'react';
import {Grid} from "@mui/material";
import CommentItem from "./CommentItem";
import {CommentApi} from "../../../types";

interface Props {
    comments: CommentApi[];
}

const CommentItems: React.FC<Props> = ({comments}) => {
    return (
        <Grid container direction='column' spacing={2} sx={{mt: 2}}>
            {comments.map(comment => (
                <CommentItem
                    key={comment._id}
                    comment={comment}
                />
            ))}
        </Grid>
    );
};

export default CommentItems;