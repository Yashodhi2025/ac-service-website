export const vaporVertex = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

export const vaporFragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uResolution;
uniform vec2 uSize;
uniform vec4 uEmitter;
uniform float uTime;
uniform float uStrength;
uniform float uHorizontal;
uniform float uParticles;
uniform sampler2D uNoise;
uniform sampler2D uVapor;

// Trilinear density noise: two cached texture lookups instead of per-pixel hashes.
float noise3(vec3 p) {
  vec3 cell = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  vec2 base = cell.xy + cell.z * vec2(37.0, 17.0);
  return mix(texture2D(uNoise, (base + f.xy + 0.5) / 128.0).r,
    texture2D(uNoise, (base + vec2(37.0, 17.0) + f.xy + 0.5) / 128.0).r, f.z);
}
float volume(vec3 p) {
  return noise3(p) * 0.57 + noise3(p * 2.03 + 13.7) * 0.29 + noise3(p * 4.11 + 37.1) * 0.14;
}
vec2 mirrorUV(vec2 p) { return 1.0 - abs(mod(p, 2.0) - 1.0); }
float hash(float p) { return fract(sin(p * 127.1 + 31.7) * 43758.5453); }

void main() {
  vec2 uv = vec2(gl_FragCoord.x / uResolution.x, 1.0 - gl_FragCoord.y / uResolution.y);
  float t = uTime;
  float distance;
  float envelope;
  vec2 flow;
  if (uHorizontal < 0.5) {
    float origin = uEmitter.y - (uv.x - uEmitter.x) * 0.012;
    distance = (uv.y - origin) / uEmitter.w;
    if (distance < 0.0 || distance > 1.0) { gl_FragColor = vec4(0.0); return; }
    float bend = sin(distance * 4.5 - t * 0.85) * distance * uEmitter.z * 0.045;
    float spread = uEmitter.z * (1.0 + 0.42 * pow(distance, 1.25));
    float crossFlow = (uv.x - uEmitter.x - bend) / spread;
    envelope = (1.0 - smoothstep(0.36, 0.55, abs(crossFlow))) * pow(1.0 - distance, 1.12);
    flow = vec2(crossFlow * 4.8 + 4.0, distance * 3.8 - t * 0.64);
  } else {
    distance = uv.x;
    float center = 0.55 + sin(uv.x * 5.1 - t * 0.85) * 0.12 + sin(uv.x * 9.3 - t * 0.56) * 0.05;
    envelope = exp(-pow((uv.y - center) * 3.5, 2.0))
      * smoothstep(0.0, 0.08, uv.x) * (1.0 - smoothstep(0.85, 1.0, uv.x));
    flow = vec2(uv.x * 6.2 - t * 0.67, (uv.y - center) * 3.2 + 2.0);
  }
  if (envelope < 0.002) { gl_FragColor = vec4(0.0); return; }

  // Evolve the volume itself rather than shifting a static cloud image.
  vec2 eddy = vec2(noise3(vec3(flow * 0.68, t * 0.17)), noise3(vec3(flow * 0.73 + 19.4, t * 0.14))) - 0.5;
  vec3 domain = vec3(flow + eddy * 1.3, t * 0.16);
  float body = volume(domain);
  float detail = volume(domain * vec3(2.8, 2.7, 1.3) + 9.8);
  float folds = pow(1.0 - abs(detail * 2.0 - 1.0), 8.0);
  float photo = pow(texture2D(uVapor, mirrorUV(flow * 0.29 + eddy * 0.27)).r, 0.55) * 0.65;
  photo += pow(texture2D(uVapor, mirrorUV(flow * 0.43 + eddy * 0.19 + vec2(0.37, 0.61))).r, 0.55) * 0.35;
  float density = 0.015 + smoothstep(0.26, 0.74, body) * 0.05
    + folds * 0.025 + photo * (0.55 + detail * 0.3);
  if (uHorizontal < 0.5) density += exp(-distance * 9.0) * 0.14;
  float alpha = min(0.65, density * envelope * uStrength);
  vec3 color = mix(vec3(0.53, 0.84, 0.98), vec3(0.94, 0.985, 1.0), body * 0.75 + detail * 0.15);

  // A few tiny glints travel with the air, never as snowfall.
  float ice = 0.0;
  for (int i = 0; i < 7; i++) {
    if (float(i) >= uParticles) break;
    float seed = float(i) + 1.0;
    float age = fract(t * (0.13 + hash(seed) * 0.05) + hash(seed + 5.0));
    vec2 pos;
    if (uHorizontal < 0.5) {
      float source = hash(seed + 17.0) - 0.5;
      pos = vec2(uEmitter.x + source * uEmitter.z * (1.0 + age * 0.42)
        + sin(age * 4.5 - t * 0.85) * age * uEmitter.z * 0.045, uEmitter.y + age * uEmitter.w * 0.9);
    } else {
      pos = vec2(age, 0.55 + sin(age * 5.1 - t * 0.85) * 0.12 + (hash(seed + 9.0) - 0.5) * 0.32);
    }
    vec2 pixel = (uv - pos) * uSize;
    ice += exp(-dot(pixel, pixel) / 1.15) * sin(age * 3.14159) * 0.38;
  }
  alpha = clamp(alpha + ice * uStrength, 0.0, 0.75);
  gl_FragColor = vec4(mix(color, vec3(0.92, 0.99, 1.0), min(ice, 1.0)), alpha);
}
`;
