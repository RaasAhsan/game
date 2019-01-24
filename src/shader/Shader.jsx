import React, { Component } from 'react';

import { start } from './demo';

export default class Shader extends Component {
  componentDidMount() {
    start();
  }

  render() {
    return (
      <div>
        <canvas id="gameCanvas" width="640" height="480"></canvas>
      </div>
    );
  }
}
