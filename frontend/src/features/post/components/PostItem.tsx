import React from 'react';
import dayjs from "dayjs";
import {NavLink} from "react-router-dom";
import {Card, Grid, Typography, CardMedia, styled} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';
import {PostApi} from "../../../types";


const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    post: PostApi;
}

const PostItem: React.FC<Props> = ({post}) => {
    return (
        <Grid item>
            <Card sx={{width: '600px'}}>
                <Grid container direction='row' alignItems='center'>
                    <Grid item xs={1}>
                        {post.image ? (
                            <ImageCardMedia image={post.image} title={post.title}/>
                        ) : (
                            <Typography variant="h5" color="red" component="div">
                                <ForumIcon/>
                            </Typography>
                        )}
                    </Grid>
                    <Grid item>
                        <Grid container direction='column' spacing='2'>
                            <Grid item>
                                <Typography variant="subtitle2" color='text.secondary' component='div'>
                                    {dayjs(post.datetime).format('DD.MM.YYYY HH:mm:ss')} by <strong>{post.user.username}</strong>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography component='div'>
                                    <NavLink to={'/posts/' + post._id}>{post.title}</NavLink>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default PostItem;