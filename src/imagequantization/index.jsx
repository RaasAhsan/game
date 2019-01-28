import React, { Component } from 'react';

import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';

const images = [image1, image2, image3];
const quantizationMethods = [average, lightness, luminosity];

function average(r, g, b, a) {
  return (r + g + b) / 3;
}

function lightness(r, g, b, a) {
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
}

function luminosity(r, g, b, a) {
  return 0.21 * r + 0.72 * g + 0.07 * b;
}

export default class ImageQuantization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
      quantizationMethodIndex: 0,
      quantizationLevels: 256
    };

    this.onChange = this.onChange.bind(this);
    this.transform = this.transform.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  transform() {
    const canvas = document.getElementById('outputImage');
    const context = canvas.getContext('2d');
    const image = document.getElementById('image');

    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.width, image.height);

    const imageData = context.getImageData(0, 0, image.width, image.height).data;
    const quantizationLevels = parseInt(this.state.quantizationLevels);
    const m = 256 / quantizationLevels;

    const arr = new Uint8ClampedArray(image.width * image.height * 4);
    for (let i = 0; i < arr.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];

      const out = quantizationMethods[this.state.quantizationMethodIndex](r, g, b, a);
      const q = Math.round(out / m) * m;

      arr[i] = q;
      arr[i + 1] = q;
      arr[i + 2] = q;
      arr[i + 3] = 255;
    }
    
    const newImageData = new ImageData(arr, image.width, image.height);
    context.putImageData(newImageData, 0, 0);
  }

  render() {
    const imageUrl = images[this.state.imageIndex];

    return (
      <div>
        <h1>Image quantization</h1>
        <div>
          <div>
            <span>Image</span>
            <select id="imageIndex" value={this.state.imageIndex} onChange={this.onChange}>
              <option value={0}>Yosemite</option>
              <option value={1}>Goat</option>
              <option value={2}>Pig</option>
            </select>
          </div>
          <div>
            <span>Quantization method</span>
            <select id="quantizationMethodIndex" value={this.state.quantizationMethodIndex} onChange={this.onChange}>
              <option value={0}>Average</option>
              <option value={1}>Lightness</option>
              <option value={2}>Luminosity</option>
            </select>
          </div>
          <div>
            <span>Quantization levels</span>
            <input type="text" id="quantizationLevels" value={this.state.quantizationLevels} onChange={this.onChange} />
          </div>
          <div>
            <button onClick={this.transform}>Transform</button>
          </div>
        </div>
        <div>
          <img id="image" width={640} src={imageUrl} />
        </div>
        <div>
          <canvas id="outputImage"></canvas>
        </div>
      </div>
    );
  }
}
