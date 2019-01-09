import { mat4 } from 'gl-matrix';

import { initializeShaders } from './shaders';
import { degToRad } from './util';

export function start() {
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
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const buffers = initBuffers(gl);

  let then = 0;

  function render(now: number) {
    now *= 0.001;
    const delta = now - then;
    then = now;

    drawScene(gl!, programInfo, buffers, delta);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  function initBuffers(gl: WebGLRenderingContext) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      -1.0,  1.0,
      1.0,  1.0,
      -1.0, -1.0,
      1.0, -1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return {
      position: positionBuffer,
    };
  }

  let rotation = 0.0;

  function drawScene(gl: WebGLRenderingContext, programInfo: any, buffers: any, delta: number) {
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

    rotation += delta * 30;

    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(rotation), [0, 1, 0]);

    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      // How much data is stored in the buffer per vertex
      const stride = 0;
      // How many bytes from the beginning does the data start
      const offset = 0;

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    gl.useProgram(programInfo.program);
    
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}
