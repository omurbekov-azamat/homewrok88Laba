import React from 'react';
import {Grid} from "@mui/material";
import PostItem from "./PostItem";
import {PostApi} from "../../../types";

interface Props {
    posts: PostApi[];
}

const PostItems: React.FC<Props> = ({posts}) => {
    return (
        <Grid container direction='column' spacing={2} sx={{mt: 2}}>
            {posts.map(post => (
                <PostItem
                    key={post._id}
                    post={post}
                />
            ))}
        </Grid>
    );
};

export default PostItems;