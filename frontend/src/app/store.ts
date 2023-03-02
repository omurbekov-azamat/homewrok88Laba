import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import {usersReducer} from "../features/user/usersSlice";
import {postsReducer} from "../features/post/postsSlice";
import {commentsReducer} from "../features/comment/commentsSlice";

const usersPersistConfig = {
    key: 'spotify:users',
    storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    users: persistReducer(usersPersistConfig, usersReducer),
    posts: postsReducer,
    comments: commentsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;