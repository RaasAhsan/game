// Shaders are executed on the GPU.
// Vertex shaders are run for every vertex passed to the OpenGL pipeline.

// Shaders are functions. They should not introduce any nondeterminism.
// The output vertex of a shader is functionally dependent on its input attributes, uniforms, etc.

// Attributes are per-vertex parameters.
// Uniforms are per-primitive parameters.
// Varying are per-fragment parameters.

// Attributes must be specified for every invocation of the vertex shader (i.e. for every vertex).
attribute vec2 aVertexPosition;

// Uniforms remain the same for the lifetime of a shader program until they are updated.
uniform mat3 uProjectionMatrix;
uniform mat3 uViewMatrix;
uniform mat3 uModelMatrix;

// Varying variables are interpolated between the values passed from the vertex shaders.

// We only need to pass local coordinates of an entity to the shader.

void main() {
    vec3 coord = uProjectionMatrix * uViewMatrix * uModelMatrix * vec3(aVertexPosition, 1.0);
    gl_Position = vec4(coord, 1.0);
}
