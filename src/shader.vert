// Shaders are executed on the GPU.
// Vertex shaders are run for every vertex passed to the OpenGL pipeline.

attribute vec4 aVertexPosition;

// Uniforms remain the same for the lifetime of a shader program until they are updated.
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
