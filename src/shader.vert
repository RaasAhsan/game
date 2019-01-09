// Shaders are executed on the GPU.
// Vertex shaders are run for every vertex passed to the OpenGL pipeline.

// Attributes are specified for every run of the vertex shader.
attribute vec2 aVertexPosition;

// Uniforms remain the same for the lifetime of a shader program until they are updated.
uniform mat3 uProjectionMatrix;
uniform mat3 uViewMatrix;

void main() {
    vec3 coord = uProjectionMatrix * uViewMatrix * vec3(aVertexPosition, 1.0);
    gl_Position = vec4(coord, 1.0);
}
