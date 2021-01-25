import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './login/login'
import AdminIndex from "./index";
import {Redirect} from "react-router";

function Main() {
    return (
        <Router>
            <Route exact path="/" render={() => (<Redirect to="/login" />)} />
            <Route path="/login/" exact component={Login}/>
            <Route path="/index/"  component={AdminIndex}/>
        </Router>
    )
}

export default Main
