import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { Test, FeedView, PhotoView, MapView } from "./Components"

class App extends Component {
  render() {
    return (
        <Router>
          <Route path="/" exact component={Test} />
          <Route path="/feed" exact component={FeedView} />
          <Route path="/photo" exact component={PhotoView} />
          <Route path="/map" exact component={MapView} />
          <nav>
            <div className='inner'>
              <div>
                <NavLink to='/feed' activeClassName='active-nav'><img src='icons/Icon1Feed.svg'></img></NavLink>
              </div>
              <div>
              <NavLink to='/photo' activeClassName='active-nav'><img src='icons/Icon3Camera.svg'></img></NavLink>
              </div>
              <div>
              <NavLink to='/map' activeClassName='active-nav'><img src='icons/Icon2Map.svg'></img></NavLink>
              </div>
            </div>
          </nav>
        </Router>
    );
  }
}

export default App;
