import express from "express";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middle/auth";
import Post from "../modules/Post";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    if (!req.body.description && req.body.image || !req.body.image && req.body.description) {
        return res.status(400).send({error: 'Description is required'});
    }
    const user = (req as RequestWithUser).user;
    try {
        const post = new Post({
            user: user.id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
            datetime: new Date().toISOString(),
        });

        await post.save();
        return res.send(post);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

postsRouter.get('/', async (req, res, next) => {
    try {
        const result = await Post.find().populate({path: 'user', select: 'username'});
        const posts = result.sort((a, b) => {
            return a.datetime < b.datetime ? 1 : -1;
        });
        return res.send(posts);
    } catch (e) {
        return next(e);
    }
});

postsRouter.get('/:id', async (req, res, next) => {
    try {
        const result = await Post.findById(req.params.id).populate({path: 'user', select: 'username'});

        if (!result) {
            return res.status(404).send({error: 'Not found'});
        }

        return res.send(result);
    } catch (e) {
        return next(e);
    }
});

export default postsRouter;