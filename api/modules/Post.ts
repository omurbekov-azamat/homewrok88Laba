import {Schema, model, Types, HydratedDocument} from 'mongoose';
import User from "./User";
import {IPost} from "../types";

const PostSchema = new Schema<IPost>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        validate: {
            validator: async function (this: HydratedDocument<IPost>, value: string)  {
                    if (!value) {
                        return Boolean(this.image);
                    }
            },
            message: 'Description is required',
        },
    },
    image: {
        type: String,
        validate: {
            validator: async function (this: HydratedDocument<IPost>, value: string) {
                if (!value) {
                    return Boolean(this.description);
                }
            },
            message: 'Image is required',
        }
    },
    datetime: {
        type: String,
        required: true,
    },
});

const Post = model('Post', PostSchema);

export default Post;