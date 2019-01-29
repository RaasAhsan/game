import React, { Component } from 'react';

function sineWave(f, t) {
  return Math.sin(2 * Math.PI * f * t);
}

function squareWave(f, t) {
  // return Math.sign(Math.sin(2 * Math.PI * f * t));
  return (2 / Math.PI) * Math.atan(Math.sin(2 * Math.PI * f * t) / 0.2);
}

export default class SoundMixer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frequency: 440
    };

    this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onClick() {
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
        // const t = j / sampleRate;
        // const f = 1330;
        // channelBuffer[j] = Math.sin(2 * Math.PI * f * t);

        // Sawtooth wave
      //   const t = j / sampleRate;
      //   const f = 1330;
      //   let a = 0;
      //   for (let i = 1; i < 100; i++) {
      //     a += Math.pow(-1, i) * Math.sin(2 * Math.PI * i * f * t) / i;
      //   }
      //   channelBuffer[j] = a;

        const t = j / sampleRate;
        channelBuffer[j] = squareWave(this.state.frequency, t);
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
        <h1>8-bit Sound Mixer</h1>
        <div>
          <div>
            <span>Frequency</span>
            <input id="frequency" type="text" value={this.state.frequency} onChange={this.onInputChange} />
          </div>
          <fieldset>
            <div>
              <input type="radio" /> White noise
            </div>
            <div>
              <input type="radio" /> Sine wave
            </div>
            <div>
              <input type="radio" /> Sawtooth wave
            </div>
          </fieldset>
          <button onClick={this.onClick}>Start</button>
        </div>
      </div>
    );
  }
}
