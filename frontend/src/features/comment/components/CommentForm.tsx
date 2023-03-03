import React, {useState} from 'react';
import {Avatar, Box, Grid, TextField, Typography} from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import {useAppSelector} from "../../../app/hook";
import {selectCommentCreateLoading, selectCommentError} from "../commentsSlice";
import {LoadingButton} from "@mui/lab";
import {CommentMutation} from "../../../types";

interface Props {
    onSubmit: (comment: CommentMutation) => void;
}

const CommentForm: React.FC<Props> = ({onSubmit}) => {
    const loading = useAppSelector(selectCommentCreateLoading);
    const error = useAppSelector(selectCommentError);
    const [comment, setComment] = useState<CommentMutation>({
        textComment: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setComment(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(comment);
        setComment({
            textComment: '',
        });
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
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
                            error={Boolean(getFieldError('textComment'))}
                            helperText={getFieldError('textComment')}
                        />
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            type='submit'
                            color='secondary'
                            loading={loading}
                            variant='contained'
                            sx={{mb: 2}}
                        >
                            Create
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CommentForm;