import React, { Component } from 'react';

import { HashRouter, Route } from 'react-router-dom';

import Home from './Home';

import SoundMixer from './soundmixer';
import Dtmf from './dtmf';
import Fft from './fft';
import SoundWaves from './soundwaves';

import GrayscaleQuantization from './grayscalequantization';
import PerlinNoise from './perlinnoise';

import Metaballs from './metaballs';
import Shader from './shader';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />

          <Route path="/soundmixer" component={SoundMixer} />
          <Route path="/dtmf" component={Dtmf} />
          <Route path="/fft" component={Fft} />
          <Route path="/soundwaves" component={SoundWaves} />

          <Route path="/grayscalequantization" component={GrayscaleQuantization} />
          <Route path="/perlinnoise" component={PerlinNoise} />

          <Route path="/metaballs" component={Metaballs} />
          <Route path="/shader" component={Shader} />
        </div>
      </HashRouter>
    );
  }
}
