import express from "express";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middle/auth";
import Post from "../modules/Post";

const postsRouter = express.Router();

postsRouter.post('/', auth, async (req, res, next) => {
    if (!req.body.description && !req.body.image) {
        return res.status(400).send({error: 'Description or Image is required'});
    }
    const user = (req as RequestWithUser).user;
    try {
        const post = new Post({
            user: user.id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
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
        const posts = await Post.find().populate({path: 'user', select: 'username'});
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