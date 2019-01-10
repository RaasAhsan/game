
precision mediump float;

struct Ball {
    vec2 position;
    float radius;
};

Ball ballArray[3];
const float threshold = 10.0;

void main() {
    ballArray[0] = Ball(vec2(640 / 2 + 60, 480 / 2), 70.0);
    ballArray[1] = Ball(vec2(640 / 2, 480 / 2), 100.0);
    ballArray[2] = Ball(vec2(640 / 2, 480 / 2 + 60), 50.0);

    float sum = 0.0;
    for (int i = 0; i < 3; i++) {
        Ball b = ballArray[i];
        vec2 v = gl_FragCoord.xy - b.position;
        float radius = b.radius * b.radius;
        float distance = dot(v, v);
        sum += radius / distance;
    }

    if (sum >= threshold) {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
