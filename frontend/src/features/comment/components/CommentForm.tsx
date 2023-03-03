import React, {useState} from 'react';
import {Avatar, Box, Grid, TextField} from "@mui/material";
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
        <Box component="form" onSubmit={submitFormHandler}>
            <Grid
                container
                direction='row'
                alignItems='center'
                width={500}
                sx={{m: 5}}
            >
                <Grid item xs>
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        <AddCommentIcon/>
                    </Avatar>
                </Grid>
                <Grid item xs={7}>
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
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='secondary'
                        loading={loading}
                        variant='contained'
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CommentForm;