import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from "./config";
import usersRouter from "./routers/users";
import postsRouter from "./routers/posts";
import commentsRouter from "./routers/comments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);