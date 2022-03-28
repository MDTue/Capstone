import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HerbsEdit from "./HerbsEdit";
import HerbsList from "./HerbList";
import HerbsPage from "./HerbsPage";


ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="Loading.."/>
            <BrowserRouter>
                <Routes>
                    <Route path="/herbsList" element={<HerbsPage/>}/>
                    <Route path='*' element={<App/>} />
                </Routes>


            </BrowserRouter>
        <App />
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
