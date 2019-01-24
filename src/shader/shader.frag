
precision mediump float;

const float circleRadius = 0.5;
const vec2 circleCenter = vec2(0.5, 0.5);

void main() {
    vec2 st = gl_FragCoord.xy / vec2(640, 480);
    gl_FragColor = vec4(st, 0.0, 1.0);
}
