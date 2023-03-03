import mongoose from "mongoose";
import config from "./config";
import User from "./modules/User";
import {randomUUID} from "crypto";
import Post from "./modules/Post";
import comment from "./modules/Comment";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('posts');
        await db.dropCollection('comments');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [userOne, userTwo] = await User.create({
        username: 'John',
        password: '123',
        token: randomUUID(),
    }, {
        username: 'Max',
        password: '123',
        token: randomUUID(),
    });

    const [postOne, postTwo] = await Post.create({
        user: userOne._id,
        title: 'Looking for job',
        datetime: new Date().toISOString(),
    }, {
        user: userTwo._id,
        title: 'Selling my laptop',
        description: 'I am selling my new laptop HP',
        image: 'fixtures/laptop.jpg',
        datetime: new Date().toISOString(),
    });

    await comment.create({
        user: userTwo._id,
        post: postOne._id,
        textComment: 'What kind of job are you looking for?'
    }, {
        user: userOne._id,
        post: postOne._id,
        textComment: 'Any job with salary minimum 5000$'
    }, {
        user: userOne._id,
        post: postTwo._id,
        textComment: 'Can i know the price?',
    }, {
        user: userTwo._id,
        post: postTwo._id,
        textComment: 'Any discount?'
    });
    await db.close();
};

void run();