import React from 'react';
import dayjs from "dayjs";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/hook";
import {selectOnePost} from "../postsSlice";
import {Card, Grid, Typography, CardMedia, styled} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';
import {apiURL} from "../../../constants";
import {PostApi} from "../../../types";


const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    post: PostApi;
}

const PostItem: React.FC<Props> = ({post}) => {
    const postApi = useAppSelector(selectOnePost);
    return (
        <Grid item>
            <Card sx={{width: '600px'}}>
                <Grid container direction='row' alignItems='center' spacing={2}>
                    <Grid item xs={3}>
                        {post.image ? (
                            <ImageCardMedia image={apiURL + '/' + post.image} title={post.title}/>
                        ) : (
                            <Typography variant="h5" color="red" component="div"
                                        sx={{textAlign: 'center', height: '55px', pt: '25px'}}>
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
                                <Typography component='div' variant='h5' color='lightsalmon'>
                                    Title: <NavLink to={'/posts/' + post._id} style={{
                                    color: 'blue',
                                    textTransform: 'capitalize'
                                }}>{post.title}</NavLink>
                                </Typography>
                            </Grid>
                            {postApi && (
                                <Grid item>
                                    {post.description ? (
                                        <Typography component='div' color='black'>
                                            Description: {post.description}
                                        </Typography>
                                    ) : (
                                        <Typography component='div' color='red'>
                                            There is no description!
                                        </Typography>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default PostItem;