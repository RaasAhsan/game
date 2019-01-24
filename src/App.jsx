import React, { Component } from 'react';

import { HashRouter, Route } from 'react-router-dom';

import Home from './Home';

import Metaballs from './metaballs/Metaballs';
import Shader from './shader/Shader';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />

          <Route path="/metaballs" component={Metaballs} />
          <Route path="/shader" component={Shader} />
        </div>
      </HashRouter>
    );
  }
}
