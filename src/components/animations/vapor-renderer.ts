import { vaporFragment, vaporVertex } from "./vapor-shaders";

export type VaporFrame = {
  width: number; height: number; time: number; strength: number;
  horizontal: boolean; particles: number; emitter: [number, number, number, number];
};
export type VaporRenderer = {
  canvas: HTMLCanvasElement; kind: "webgl" | "canvas2d";
  draw: (frame: VaporFrame) => void; dispose: () => void;
};
function noisePixels() {
  const data = new Uint8Array(128 * 128 * 4);
  let seed = 47291;
  for (let i = 0; i < data.length; i += 4) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    data[i] = data[i + 1] = data[i + 2] = seed >>> 24;
    data[i + 3] = 255;
  }
  return data;
}
function gpuRenderer(canvas: HTMLCanvasElement): VaporRenderer | null {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, preserveDrawingBuffer: true, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders: WebGLShader[] = [], textures: WebGLTexture[] = [];
  const program = gl.createProgram(), buffer = gl.createBuffer();
  let disposed = false;
  const image = new Image();
  function dispose() {
    disposed = true; image.onload = image.onerror = null;
    textures.forEach(texture => gl!.deleteTexture(texture));
    shaders.forEach(shader => gl!.deleteShader(shader));
    gl!.deleteBuffer(buffer); gl!.deleteProgram(program);
    gl!.getExtension("WEBGL_lose_context")?.loseContext();
  }
  try {
    if (!program || !buffer) throw new Error("Canvas resources unavailable");
    for (const [type, source] of [[gl.VERTEX_SHADER, vaporVertex], [gl.FRAGMENT_SHADER, vaporFragment]] as const) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader unavailable");
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compilation failed");
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Vapor program unavailable");
    gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniform = Object.fromEntries(["uResolution", "uSize", "uEmitter", "uTime", "uStrength", "uHorizontal", "uParticles", "uNoise", "uVapor"]
      .map(name => [name, gl.getUniformLocation(program, name)]));
    function texture(unit: number, pixels: Uint8Array, size: number) {
      const value = gl!.createTexture();
      if (!value) throw new Error("Texture unavailable");
      textures.push(value); gl!.activeTexture(gl!.TEXTURE0 + unit); gl!.bindTexture(gl!.TEXTURE_2D, value);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.REPEAT);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.REPEAT);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, size, size, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, pixels);
      return value;
    }
    texture(0, noisePixels(), 128);
    const vaporTexture = texture(1, new Uint8Array([24, 24, 24, 255]), 1);
    gl.uniform1i(uniform.uNoise, 0); gl.uniform1i(uniform.uVapor, 1);
    image.decoding = "async";
    image.onload = () => {
      if (disposed || gl.isContextLost()) return;
      const tile = document.createElement("canvas"); tile.width = tile.height = 512;
      tile.getContext("2d")?.drawImage(image, 0, 0, 512, 512);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, vaporTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tile);
    };
    image.src = "/images/vapor-density.webp";
    return { canvas, kind: "webgl", dispose, draw(frame) {
      if (disposed || gl.isContextLost()) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniform.uResolution, canvas.width, canvas.height); gl.uniform2f(uniform.uSize, frame.width, frame.height);
      gl.uniform4f(uniform.uEmitter, ...frame.emitter); gl.uniform1f(uniform.uTime, frame.time);
      gl.uniform1f(uniform.uStrength, frame.strength); gl.uniform1f(uniform.uHorizontal, frame.horizontal ? 1 : 0);
      gl.uniform1f(uniform.uParticles, frame.particles); gl.drawArrays(gl.TRIANGLES, 0, 6);
    } };
  } catch { dispose(); return null; }
}

// Animated low-resolution density fallback, not a static mist image or sliced sprite renderer.
function cpuRenderer(canvas: HTMLCanvasElement): VaporRenderer {
  const context = canvas.getContext("2d", { alpha: true });
  const scratch = document.createElement("canvas"), pixels = noisePixels();
  const ctx = scratch.getContext("2d");
  let image: ImageData | undefined;
  let photo: Uint8ClampedArray | undefined;
  const source = new Image();
  source.onload = () => {
    const tile = document.createElement("canvas"); tile.width = tile.height = 256;
    const texture = tile.getContext("2d", { willReadFrequently: true });
    if (!texture) return;
    texture.drawImage(source, 0, 0, 256, 256);
    photo = texture.getImageData(0, 0, 256, 256).data;
  };
  source.src = "/images/vapor-density.webp";
  const smooth = (a: number, b: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t);
  };
  const read = (x: number, y: number) => pixels[((y & 127) * 128 + (x & 127)) * 4] / 255;
  const mirror = (v: number) => 1 - Math.abs(((v % 2) + 2) % 2 - 1);
  function noise(x: number, y: number) {
    const ix = Math.floor(x), iy = Math.floor(y), fx = smooth(0, 1, x - ix), fy = smooth(0, 1, y - iy);
    return (read(ix, iy) * (1 - fx) + read(ix + 1, iy) * fx) * (1 - fy)
      + (read(ix, iy + 1) * (1 - fx) + read(ix + 1, iy + 1) * fx) * fy;
  }
  function photograph(x: number, y: number) {
    if (!photo) return 0.27;
    return Math.pow(photo[(Math.min(255, Math.floor(mirror(y) * 256)) * 256
      + Math.min(255, Math.floor(mirror(x) * 256))) * 4] / 255, 0.55);
  }
  return { canvas, kind: "canvas2d", dispose() { source.onload = null; scratch.width = scratch.height = 1; }, draw(frame) {
    if (!context || !ctx) return;
    const w = Math.min(210, Math.ceil(frame.width * 0.42)), h = Math.max(1, Math.round(w * frame.height / frame.width));
    if (!image || image.width !== w || image.height !== h) {
      scratch.width = w; scratch.height = h; image = ctx.createImageData(w, h);
    }
    const [cx, cy, span, length] = frame.emitter, time = frame.time;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const u = x / w, v = y / h, offset = (y * w + x) * 4;
      let envelope = 0, fx = 0, fy = 0;
      if (frame.horizontal) {
        const center = 0.55 + Math.sin(u * 5.1 - time * 0.85) * 0.12;
        envelope = Math.exp(-Math.pow((v - center) * 3.5, 2)) * smooth(0, 0.08, u) * (1 - smooth(0.85, 1, u));
        fx = u * 6.2 - time * 0.67; fy = (v - center) * 3.2 + 2;
      } else {
        const d = (v - cy + (u - cx) * 0.012) / length;
        if (d >= 0 && d <= 1) {
          const bend = Math.sin(d * 4.5 - time * 0.85) * d * span * 0.045;
          const cross = (u - cx - bend) / (span * (1 + 0.42 * Math.pow(d, 1.25)));
          envelope = (1 - smooth(0.36, 0.55, Math.abs(cross))) * Math.pow(1 - d, 1.12);
          fx = cross * 4.8 + 4; fy = d * 3.8 - time * 0.64;
        }
      }
      if (envelope < 0.002) { image.data[offset + 3] = 0; continue; }
      const eddy = noise(fx * 0.68 + time * 0.17, fy * 0.73) - 0.5;
      const body = noise(fx + eddy * 1.3, fy + eddy * 0.8) * 0.68 + noise(fx * 2.03 + 13.7, fy * 2.03 - time * 0.1) * 0.32;
      image.data[offset] = 184 + body * 55; image.data[offset + 1] = 224 + body * 25; image.data[offset + 2] = 255;
      const vapor = photograph(fx * 0.29 + eddy * 0.27, fy * 0.29 + eddy * 0.27) * 0.65
        + photograph(fx * 0.43 + eddy * 0.19 + 0.37, fy * 0.43 + eddy * 0.19 + 0.61) * 0.35;
      const density = 0.035 + body * 0.06 + vapor * 0.7;
      image.data[offset + 3] = Math.min(180, envelope * density * frame.strength * 255);
    }
    ctx.putImageData(image, 0, 0); context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(scratch, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < frame.particles; i++) {
      const age = (time * 0.15 + i * 0.371) % 1, source = Math.sin(i * 17.1) * 0.45;
      const u = frame.horizontal ? age : cx + source * span * (1 + age * 0.42);
      const v = frame.horizontal ? 0.55 + Math.sin(age * 5.1 - time * 0.85) * 0.12 + source * 0.3 : cy + age * length * 0.9;
      context.fillStyle = `rgba(222,250,255,${Math.sin(age * Math.PI) * frame.strength * 0.38})`;
      context.beginPath(); context.arc(u * canvas.width, v * canvas.height, 0.85, 0, Math.PI * 2); context.fill();
    }
  } };
}
export function createVaporRenderer(): VaporRenderer {
  return gpuRenderer(document.createElement("canvas")) ?? cpuRenderer(document.createElement("canvas"));
}
