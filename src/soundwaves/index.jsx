import React, { Component } from 'react';

export default class SoundWaves extends Component {
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
        const f = 440;
        let a = Math.sin(2 * Math.PI * f * t * i);
        // for (let i = 1; i < 2; i++) {
        //   a += Math.sin(2 * Math.PI * f * t * i);
        // }
        channelBuffer[j] = a;
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
        <h1>Sound waves</h1>
        <div>
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
          <button onClick={e => this.onClick()}>Start</button>
        </div>
      </div>
    );
  }
}
