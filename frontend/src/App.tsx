import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import Posts from "./containers/Posts";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Posts/>}/>
                <Route path='/Posts' element={<Posts/>}/>
            </Route>
        </Routes>
    );
}

export default App;
