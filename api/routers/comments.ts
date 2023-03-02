import express from "express";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middle/auth";
import Comment from "../modules/Comment";

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const comment = new Comment({
            user: user._id,
            post: req.body.post,
            textComment: req.body.textComment,
        });
        await comment.save();
        return res.send({message: 'Created comment successfully!', comment});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return  next(error);
    }
});

commentsRouter.get('/:id', async (req, res, next) => {
   try {
       const comments = await Comment.find({post: req.params.id}).populate({path: 'user', select: 'username'});
       return res.send(comments);
   } catch (e) {
       return next(e);
   }
});

export default commentsRouter;