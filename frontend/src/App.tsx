import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import Posts from "./containers/Posts";
import Register from "./features/user/Register";
import Login from "./features/user/Login";
import NewPost from "./features/post/NewPost";
import Post from "./containers/Post";


function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Posts/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='/new-post' element={<NewPost/>}/>
                <Route path='/posts/:id' element={<Post/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={(<h1>Not found!</h1>)}/>
            </Route>
        </Routes>
    );
}

export default App;
