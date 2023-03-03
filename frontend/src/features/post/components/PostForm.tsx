import React, {useState} from "react";
import {Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import {useAppSelector} from "../../../app/hook";
import {selectCreatePostLoading, selectPostError} from "../postsSlice";
import {LoadingButton} from "@mui/lab";
import {PostMutation} from '../../../types';

interface Props {
    onSubmit: (mutation: PostMutation) => void;
}

const PostForm: React.FC<Props> = ({onSubmit}) => {
    const error = useAppSelector(selectPostError);
    const loading = useAppSelector(selectCreatePostLoading);

    const [post, setPost] = useState<PostMutation>({
        title: '',
        description: '',
        image: null,
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(post);
        setPost({
            title: '',
            description: '',
            image: null,
        });
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPost(prev => {
            return {...prev, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setPost(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography component='div' variant='h5'>
                        Add new post
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="title" label="Title"
                        value={post.title}
                        onChange={inputChangeHandler}
                        name="title"
                        error={Boolean(getFieldError('title'))}
                        helperText={getFieldError('title')}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="description" label="Description"
                        value={post.description}
                        onChange={inputChangeHandler}
                        name="description"
                        error={Boolean(getFieldError('description'))}
                        helperText={getFieldError('description')}
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        label="Image"
                        onChange={fileInputChangeHandler}
                        name="image"
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='warning'
                        loading={loading}
                        variant='contained'
                        sx={{mb: 2}}
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default PostForm;