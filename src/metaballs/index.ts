import { initializeShaders } from '../shaders';

const vertexSource = require('./shader.vert');
const fragmentSource = require('./shader.frag');

export function start(): void {
  const canvas = document.querySelector('#gameCanvas') as HTMLCanvasElement;
  if (canvas === null) {
    alert('Cannot find canvas.');
    return;
  }

  const gl = canvas.getContext('webgl');
  if (gl === null) {
    alert('Failed to initialize WebGL.');
    return;
  }

  const shaderProgram = initializeShaders(gl, vertexSource, fragmentSource);
  if (shaderProgram === null) {
    return;
  }

  const programInfo = {
    program: shaderProgram,
    locations: {
      attributes: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      }
    }
  };

  gl.useProgram(programInfo.program);

  // Enables the specified attribute.
  gl.enableVertexAttribArray(programInfo.locations.attributes.vertexPosition);

  let then = 0;

  function loop(now: number): void {
    now *= 0.001;
    const delta = now - then;
    then = now;

    drawScene(gl!, programInfo, delta);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  let rotation = 0.0;
  let t = 0.0;

  function drawScene(gl: WebGLRenderingContext, programInfo: any, delta: number): void {
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Sets the value to use when clearing the color buffer.
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clears the color buffer.
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    rotation += delta * 40;

    gl.useProgram(programInfo.program);

    {
      const positions = [
        -1.0, 1.0,
        1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0
      ];

      const positionBuffer = gl.createBuffer();
      // Binds the position buffer to ARRAY_BUFFER.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      // Copies the contents of the source array to the buffer currently bound to ARRAY_BUFFER.
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      // How much data is stored in the buffer per vertex
      const stride = 0;
      // How many bytes from the beginning does the data start
      const offset = 0;

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      // Binds the buffer currently bound to ARRAY_BUFFER to a vertex attribute and specifies its layout.
      gl.vertexAttribPointer(programInfo.locations.attributes.vertexPosition, numComponents, type, normalize, stride, offset);
    }

    // Set the current shader program.
    gl.useProgram(programInfo.program);
    
    const offset = 0;
    const vertexCount = 4;

    // Renders primitives from the buffer bound to ARRAY_BUFFER.
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

