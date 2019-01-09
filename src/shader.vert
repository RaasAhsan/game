// Shaders are executed on the GPU.
// Vertex shaders are run for every vertex passed to the OpenGL pipeline.

// Shaders are functions.
// The output vertex of a shader is functionally dependent on its input attributes, uniforms, etc.

// Attributes are specified for every run of the vertex shader.
attribute vec2 aVertexPosition;

// Uniforms remain the same for the lifetime of a shader program until they are updated.
uniform mat3 uProjectionMatrix;
uniform mat3 uViewMatrix;
uniform mat3 uModelMatrix;

// We only need to pass local coordinates of some entity to the shader.

void main() {
    vec3 coord = uProjectionMatrix * uViewMatrix * uModelMatrix * vec3(aVertexPosition, 1.0);
    gl_Position = vec4(coord, 1.0);
}
