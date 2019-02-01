import React, { Component } from 'react';

import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';

const images = [image1, image2, image3];

function average(r, g, b, a) {
  return (r + g + b) / 3;
}

function clamp(i) {
  return Math.max(0, Math.min(255, i));
}

function nearestColor(palette, v) {
  let n = 0;
  let d = 256;
  for (let i = 0; i < palette.length; i++) {
    let a = Math.abs(palette[i] - v);
    if (a < d) {
      n = palette[i];
      d = a;
    }
  }
  return n;
}

export default class ImageQuantization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
      quantizationBits: 8,
      dithering: false
    };

    this.onChange = this.onChange.bind(this);
    this.onCheckbox = this.onCheckbox.bind(this);
    this.transform = this.transform.bind(this);
  }

  onCheckbox(event) {
    this.setState({
      [event.target.id]: event.target.checked
    });
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
    const quantizationBits = parseInt(this.state.quantizationBits);
    const levels = Math.pow(2, quantizationBits);

    const palette = [0];
    for (let i = 2; i < levels; i++) {
      palette.push((256 / levels) * (i - 1));
    }
    
    palette.push(255);

    const arr = new Uint8ClampedArray(image.width * image.height * 4);
    for (let i = 0; i < arr.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];

      const out = average(r, g, b, a);

      arr[i] = out;
      arr[i + 1] = out;
      arr[i + 2] = out;
      arr[i + 3] = 255;
    }

    for (let i = 0; i < arr.length; i += 4) {
      const pn = i / 4;
      const px = pn % image.width;
      const py = (pn - px) / image.width;

      // Nearest color palette
      const out = arr[i];
      let q = nearestColor(palette, out);

      arr[i] = q;
      arr[i + 1] = q;
      arr[i + 2] = q;
      arr[i + 3] = 255;

      if (this.state.dithering) {
        const e1 = out - q;

        if (py < image.height - 1) {
          arr[i + image.width * 4    ] = clamp(arr[i + image.width * 4    ] + (e1 * 7.0/16));
          arr[i + image.width * 4 + 1] = clamp(arr[i + image.width * 4 + 1] + (e1 * 7.0/16));
          arr[i + image.width * 4 + 2] = clamp(arr[i + image.width * 4 + 2] + (e1 * 7.0/16));
          arr[i + image.width * 4 + 3] = 255.0;

          if (px > 0) {
            arr[i + (image.width - 1) * 4    ] = clamp(arr[i + (image.width - 1) * 4    ] + (e1 * 3.0/16));
            arr[i + (image.width - 1) * 4 + 1] = clamp(arr[i + (image.width - 1) * 4 + 1] + (e1 * 3.0/16));
            arr[i + (image.width - 1) * 4 + 2] = clamp(arr[i + (image.width - 1) * 4 + 2] + (e1 * 3.0/16));
            arr[i + (image.width - 1) * 4 + 3] = 255.0;
          }

          if (px < image.width - 1) {
            arr[i + (image.width + 1) * 4    ] = clamp(arr[i + (image.width + 1) * 4    ] + (e1 * 1.0/16));
            arr[i + (image.width + 1) * 4 + 1] = clamp(arr[i + (image.width + 1) * 4 + 1] + (e1 * 1.0/16));
            arr[i + (image.width + 1) * 4 + 2] = clamp(arr[i + (image.width + 1) * 4 + 2] + (e1 * 1.0/16));
            arr[i + (image.width + 1) * 4 + 3] = 255.0;
          }
        }
  
        // Not last pixel in a row
        if (px < image.width - 1) {
          const f = e1 * 5.0 / 16;
          arr[i + 4] = clamp(arr[i + 4] + f);
          arr[i + 5] = clamp(arr[i + 5] + f);
          arr[i + 6] = clamp(arr[i + 6] + f);
          arr[i + 7] = 255.0;
        }
      }
    }
    
    const newImageData = new ImageData(arr, image.width, image.height);
    context.putImageData(newImageData, 0, 0);
  }

  render() {
    const imageUrl = images[this.state.imageIndex];

    return (
      <div>
        <h1>Grayscale quantization</h1>
        <p>
          Transforms a four-channel RGBA image to a single-channel monochrome image, performing image quantization to 
          reduce the discrete range of channel values. It may also perform Floyd-Steinberg dithering, which adds
          deterministic noise to the image intended to balance quantization error out among neighboring pixels.
        </p>
        <div>
          <div>
            <span>Image: </span>
            <select id="imageIndex" value={this.state.imageIndex} onChange={this.onChange}>
              <option value={0}>Yosemite</option>
              <option value={1}>Goat</option>
              <option value={2}>Pig</option>
            </select>
          </div>
          <div>
            <span>Quantization bits: </span>
            <input type="text" id="quantizationBits" value={this.state.quantizationBits} onChange={this.onChange} />
          </div>
          <div>
            <input id="dithering" type="checkbox" value={this.state.dithering} onChange={this.onCheckbox} />
            <label htmlFor="dithering">Dithering</label>
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
