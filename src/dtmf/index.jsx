import React, { Component } from 'react';

/*
DTMF (Dual Tone Multiple Frequencies) tones are composed of an upper and lower band.
Each band is a signal that operates at a particular frequency.
The upper and lower bands are combined to form a composite wave -- the DTMF tone.
*/

// Numbers 0 through 9 are their index. * is 10, # is 11.
const dtmfUpperBand = [1336, 1209, 1336, 1477, 1209, 1336, 1477, 1209, 1336, 1477, 1209, 1477];
const dtmfLowerBand = [941, 697, 697, 697, 770, 770, 770, 852, 852, 852, 941, 941];

export default class Dtmf extends Component {
  onClick(tone) {
    const AudioContext = window.AudioContext;
    const audioContext = new AudioContext();

    const sampleRate = audioContext.sampleRate;

    const frames = 0.5 * sampleRate;
  
    const buffer = audioContext.createBuffer(2, frames, sampleRate);
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const channelBuffer = buffer.getChannelData(i);
      for (let j = 0; j < channelBuffer.length; j++) {
        // White noise
        // channelBuffer[j] = Math.random() * 2 - 1;
        
        // Sine wave
        const t = j / sampleRate;
        const f1 = dtmfUpperBand[tone];
        const f2 = dtmfLowerBand[tone];
        channelBuffer[j] = Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t);
      }
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  }

  render() {
    return (
      <div>
        <h1>DTMF</h1>
        <div>
          <button onClick={e => this.onClick(1)}>1</button>
          <button onClick={e => this.onClick(2)}>2</button>
          <button onClick={e => this.onClick(3)}>3</button>
        </div>
        <div>
          <button onClick={e => this.onClick(4)}>4</button>
          <button onClick={e => this.onClick(5)}>5</button>
          <button onClick={e => this.onClick(6)}>6</button>
        </div>
        <div>
          <button onClick={e => this.onClick(7)}>7</button>
          <button onClick={e => this.onClick(8)}>8</button>
          <button onClick={e => this.onClick(9)}>9</button>
        </div>
        <div>
          <button onClick={e => this.onClick(10)}>*</button>
          <button onClick={e => this.onClick(0)}>0</button>
          <button onClick={e => this.onClick(11)}>#</button>
        </div>
      </div>
    );
  }
}
