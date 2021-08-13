import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const Test = () => <div>Test</div>;

ReactDOM.render(
  <Router>
    <Route path='/' component={Test}></Route>
  </Router>,
  document.getElementById('root')
);
