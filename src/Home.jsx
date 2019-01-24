import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Demos</h2>
      <div>
        <Link to="/metaballs">Metaballs</Link>
      </div>
      <div>
        <Link to="/shader">Shader</Link>
      </div>
    </div>
  );
}
