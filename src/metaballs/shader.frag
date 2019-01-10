
precision mediump float;

struct Ball {
    vec2 position;
    float radius;
};

Ball ballArray[2];

void main() {
    ballArray[0] = Ball(vec2(640 / 2 + 100, 480 / 2), 40.0);
    ballArray[1] = Ball(vec2(640 / 2, 480 / 2), 60.0);

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

    for (int i = 0; i < 2; i++) {
        Ball b = ballArray[i];
        vec2 v = gl_FragCoord.xy - b.position;
        float distanceSquared = dot(v, v);

        if (distanceSquared <= b.radius * b.radius) {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            break;
        }
    }
}
