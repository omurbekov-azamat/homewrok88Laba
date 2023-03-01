import {Schema, model, Types} from 'mongoose';
import User from "./User";
import {IPost} from "../types";

const PostSchema = new Schema<IPost>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    datetime: {
        type: String,
        required: true,
    },
});

const Post = model('Post', PostSchema);

export default Post;