import React, { Component } from 'react';

import { start } from './demo';

export default class Metaballs extends Component {
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
