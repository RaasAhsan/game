import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Demos</h1>
      
      <section>
        <h2>Audio</h2>
        <div>
          <Link to="/dtmf">DTMF</Link>
        </div>
        <div>
          <Link to="/fft">FFT</Link>
        </div>
        <div>
          <Link to="/soundwaves">Sound waves</Link>
        </div>
      </section>

      <section>
        <h2>Graphics</h2>
        <div>
          <Link to="/imagequantization">Image quantization</Link>
        </div>
      </section>
      
      <section>
        <h2>WebGL Shaders</h2>
        <div>
          <Link to="/metaballs">Metaballs</Link>
        </div>
        <div>
          <Link to="/shader">Shader</Link>
        </div>
      </section>
    </div>
  );
}
