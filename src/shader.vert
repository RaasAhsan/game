// Shaders are executed on the GPU.
// Vertex shaders are run for every vertex passed to the OpenGL pipeline.

attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
