import React, { Component } from 'react';

export default class PerlinNoise extends Component {
  constructor(props) {
    super(props);

    this.generate = this.generate.bind(this);
  }

  generate() {

  }

  render() {
    return (
      <div>
        <h1>Perlin noise</h1>
        <div>
          <button onClick={this.generate}>Generate</button>
        </div>
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}
