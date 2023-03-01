import mongoose from "mongoose";
import config from "./config";
import User from "./modules/User";
import {randomUUID} from "crypto";
import Post from "./modules/Post";

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
        username: 'John Doe',
        password: '123',
        token: randomUUID(),
    }, {
        username: 'Max Twain',
        password: '123',
        token: randomUUID(),
    });

    await Post.create({
        user: userOne._id,
        title: 'Looking for job',
        description: 'Hey guys, i need help',
        image: 'fixtures/job.jpg',
        datetime: new Date().toISOString(),
    }, {
        user: userOne._id,
        title: 'Selling my laptop',
        description: 'I am selling my new laptop HP',
        image: 'fixtures/laptop.jpg',
        datetime: new Date().toISOString(),
    }, {
        user: userTwo._id,
        title: 'I wanna by iphone',
        description: 'I am looking for iphone 13',
        image: 'fixtures/iphone.jpg',
        datetime: new Date().toISOString(),
    }, {
        user: userTwo._id,
        title: 'Selling car',
        description: 'I am selling car',
        image: null,
        datetime: new Date().toISOString(),
    });
    await db.close();
};

void run();