import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
