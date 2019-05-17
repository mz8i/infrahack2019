import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Test, FeedView, PhotoView, MapView } from "./Components"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Test} />
          <Route path="/feed" exact component={FeedView} />
          <Route path="/photo" exact component={PhotoView} />
          <Route path="/map" exact component={MapView} />
        </Router>
        <a href="feed">Feed</a> <br />
        <a href="photo">Photo</a> <br />
        <a href="map">Map</a> <br />
      </div>
    );
  }
}

export default App;
