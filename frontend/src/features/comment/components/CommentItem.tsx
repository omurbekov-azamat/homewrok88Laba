import React from 'react';
import {Card, Grid, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {CommentApi} from "../../../types";

interface Props {
    comment: CommentApi;
}

const CommentItem: React.FC<Props> = ({comment}) => {
    return (
        <Grid item>
            <Card sx={{width: '600px'}}>
                <Grid container direction='row' alignItems='center'>
                    <Grid item xs={3} textAlign='center'>
                        <Typography>
                            <PersonIcon/>
                        </Typography>
                        <Typography variant="subtitle2" color='text.secondary' component='div'>
                            <strong>{comment.user.username}</strong>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component='div' color='black'>
                            {comment.textComment}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default CommentItem;