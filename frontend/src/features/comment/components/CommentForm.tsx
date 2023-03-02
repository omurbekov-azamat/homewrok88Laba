import React, {useState} from 'react';
import {Avatar, Box, Button, Grid, TextField, Typography} from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import {CommentMutation} from "../../../types";

const CommentForm = () => {
    const [comment, setComment] = useState<CommentMutation>({
        textComment: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setComment(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setComment({
            textComment: '',
        });
    };

    return (
        <Box sx={{ml: 3}}>
            <Box
                style={{
                    marginTop: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            />
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <AddCommentIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Create new comment
            </Typography>
            <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="comment"
                            name="textComment"
                            autoComplete="current-username"
                            value={comment.textComment}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CommentForm;