import { mat4 } from 'gl-matrix';

import { initializeShaders } from './shaders';
import { degToRad } from './util';

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

  const vertexSource = require('./shader.vert');
  const fragmentSource = require('./shader.frag');

  const shaderProgram = initializeShaders(gl, vertexSource, fragmentSource);
  if (shaderProgram === null) {
    return;
  }

  const programInfo = {
    program: shaderProgram,
    locations: {
      attributes: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniforms: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      }
    }
  };

  let then = 0;

  function render(now: number): void {
    now *= 0.001;
    const delta = now - then;
    then = now;

    drawScene(gl!, programInfo, delta);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  let rotation = 0.0;

  function drawScene(gl: WebGLRenderingContext, programInfo: any, delta: number): void {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = degToRad(45);
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const modelViewMatrix = mat4.create();

    rotation += delta * 40;

    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(rotation), [0, 1, 0]);
    
    // Set the current program.
    gl.useProgram(programInfo.program);

    // Enables the specified attribute.
    gl.enableVertexAttribArray(programInfo.locations.attributes.vertexPosition);

    // Specify matrix values for uniforms.
    gl.uniformMatrix4fv(programInfo.locations.uniforms.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.locations.uniforms.modelViewMatrix, false, modelViewMatrix);

    {
      const positionBuffer = gl.createBuffer();
      // Binds the position buffer to ARRAY_BUFFER.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      const positions = [
        -1.0,  1.0,
        1.0,  1.0,
        -1.0, -1.0,
        1.0, -1.0,
      ];

      // Copies the source array into the buffer currently bound to ARRAY_BUFFER.
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

    gl.useProgram(programInfo.program);
    
    const offset = 0;
    const vertexCount = 4;

    // Renders primitives from the buffer bound to ARRAY_BUFFER.
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}
