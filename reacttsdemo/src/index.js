import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
/* import 'core-js/stable';
import 'regenerator-runtime/runtime'; */

const Home = () => <div>Home</div>;

ReactDOM.render(
  <Router>
    <Route path='/' component={Home}></Route>
  </Router>,
  document.getElementById('root')
);
