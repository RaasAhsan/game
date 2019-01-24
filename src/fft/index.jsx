import React, { Component } from 'react';

const chunks = [];

export default class Fft extends Component {
  constructor(props) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  onStart() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then(stream => {
        const audioTrack = stream.getAudioTracks()[0];
        
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeTypes: 'audio/webm;codecs=opus'
        });
        this.mediaRecorder.start();

        console.log('Started recorder.');

        this.mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onStop() {
    this.mediaRecorder.stop();

    setTimeout(() => {
      const blob = chunks[chunks.length - 1];

      const AudioContext = window.AudioContext;
      const audioContext = new AudioContext();

      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        const result = reader.result;

        audioContext.decodeAudioData(result, decoded => {
          console.log(decoded);
        }, error => {
          console.error(error);
        });
      });
      reader.readAsArrayBuffer(blob);
    }, 1000);
  }

  render() {
    return (
      <div>
        <h1>FFT</h1>
        <div>
          <button onClick={this.onStart}>Start</button>
          <button onClick={this.onStop}>Stop</button>
        </div>
      </div>
    );
  }
}
