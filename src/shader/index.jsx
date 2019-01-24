import React, { Component } from 'react';

import { start } from './demo';

export default class Shader extends Component {
  componentDidMount() {
    start();
  }

  render() {
    return (
      <div>
        <h1>Shader</h1>
        <canvas id="gameCanvas" width="640" height="480"></canvas>
      </div>
    );
  }
}
