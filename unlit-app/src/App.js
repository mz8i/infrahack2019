import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Test, Button } from "./Components"

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Test} />
        <Route path="/1" exact component ={Button}/>
      </Router>
    );
  }
}

export default App;
