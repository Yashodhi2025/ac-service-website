"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import styles from "./freezing-airflow.module.css";

type MistParticle = { age: number; life: number; source: number; seed: number; size: number; flip: boolean };
type IceParticle = { age: number; life: number; source: number; seed: number; size: number };
const smooth = (from: number, to: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

export function FreezingAirflow({ unitRef }: { unitRef: RefObject<HTMLImageElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const unit = unitRef.current;
    if (!canvas || !unit) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const texture = new window.Image();
    texture.decoding = "async";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const intensity = { value: 0 };
    let disposed = false;
    let ready = false;
    let inView = false;
    let running = false;
    let lastFrame = 0;
    let clock = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let ventX = 0;
    let ventY = 0;
    let ventWidth = 0;
    let travel = 0;
    let mist: MistParticle[] = [];
    let ice: IceParticle[] = [];

    // Soft illumination is rasterized once, not blurred or recreated each frame.
    const glow = document.createElement("canvas");
    glow.width = 128;
    glow.height = 128;
    const glowContext = glow.getContext("2d");
    if (glowContext) {
      const light = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
      light.addColorStop(0, "rgba(78,220,255,0.3)");
      light.addColorStop(0.5, "rgba(0,199,232,0.12)");
      light.addColorStop(1, "rgba(0,199,232,0)");
      glowContext.fillStyle = light;
      glowContext.fillRect(0, 0, 128, 128);
    }

    const glint = document.createElement("canvas");
    glint.width = glint.height = 16;
    const glintContext = glint.getContext("2d");
    if (glintContext) {
      const light = glintContext.createRadialGradient(8, 8, 0, 8, 8, 8);
      light.addColorStop(0, "rgba(245,253,255,0.95)");
      light.addColorStop(0.2, "rgba(211,245,255,0.65)");
      light.addColorStop(1, "rgba(160,235,255,0)");
      glintContext.fillStyle = light;
      glintContext.fillRect(0, 0, 16, 16);
    }

    // The broad diffuse layer is blurred once on load; detailed vapor stays cached separately.
    const softTexture = document.createElement("canvas");
    softTexture.width = 672;
    softTexture.height = 245;

    function seedParticles() {
      const count = mobile.matches ? 20 : 32;
      mist = Array.from({ length: count }, (_, index) => ({
        age: (index + 0.4) / count,
        life: 4.2 + Math.random() * 1.8,
        source: ((index % 5) + Math.random() * 0.6) / 5 - 0.46,
        seed: Math.random() * Math.PI * 2,
        size: 0.75 + Math.random() * 0.5,
        flip: index % 2 === 0,
      }));
      ice = Array.from({ length: mobile.matches ? 5 : 9 }, (_, index) => ({
        age: (index + 0.2) / (mobile.matches ? 5 : 9),
        life: 2.8 + Math.random() * 1.7,
        source: Math.random() - 0.5,
        seed: Math.random() * Math.PI * 2,
        size: 0.65 + Math.random() * 0.65,
      }));
    }

    function draw(still = false) {
      if (disposed || !width || !height) return;
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width / ratio, canvas!.height / ratio);
      if (!ready) return;
      const strength = intensity.value * (still ? 0.48 : 1);

      ctx!.globalAlpha = 0.7 * strength;
      ctx!.drawImage(glow, ventX - ventWidth * 0.6, ventY - 12, ventWidth * 1.2, Math.min(110, travel * 0.65));

      // Shared low-frequency eddies keep the layers flowing together, rather than jittering.
      for (const particle of mist) {
        const t = particle.age;
        const distance = 1 - Math.pow(1 - t, 1.2);
        const spread = 1 + 0.55 * distance;
        const wave = Math.sin(distance * 8 - clock * 0.7 + particle.seed) * (4 + distance * 13);
        const fineWave = Math.sin(distance * 17 + clock * 0.35 + particle.seed) * distance * 3;
        const x = ventX + particle.source * ventWidth * spread + wave + fineWave;
        const y = ventY + distance * travel + Math.sin(particle.seed + clock * 0.4) * distance * 4;
        const spriteWidth = ventWidth * (0.48 + distance * 0.42) * particle.size;
        const spriteHeight = spriteWidth * (0.35 + Math.sin(particle.seed) * 0.04);
        const opacity = smooth(0, 0.055, t) * (1 - smooth(0.42, 1, t));

        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(Math.sin(particle.seed + distance * 5 - clock * 0.15) * 0.16);
        ctx!.scale(particle.flip ? -1 : 1, 1);
        ctx!.globalAlpha = opacity * strength * (mobile.matches ? 0.095 : 0.075);
        ctx!.drawImage(softTexture, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
        // Sparse fine detail breaks up the soft volume without recognizable repeated cloud stamps.
        if (particle.seed < 2) {
          ctx!.globalAlpha = opacity * strength * 0.012;
          ctx!.drawImage(texture, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
        }
        ctx!.restore();
      }

      // A few tiny advected highlights; no snowflake sprites or snowfall emitter.
      if (!still) {
        for (const particle of ice) {
          const t = particle.age;
          const x = ventX + particle.source * ventWidth * (1 + t * 0.5) + Math.sin(clock * 0.6 + particle.seed) * t * 8;
          const y = ventY + t * travel * 0.9;
          const fade = smooth(0.02, 0.15, t) * (1 - smooth(0.4, 0.95, t));
          const size = particle.size * 3;
          ctx!.globalAlpha = fade * strength * (0.22 + Math.sin(clock * 2 + particle.seed) * 0.08);
          ctx!.drawImage(glint, x - size / 2, y - size / 2, size, size);
        }
      }
      ctx!.globalAlpha = 1;
    }

    const intro = gsap.to(intensity, { value: 1, duration: 1.25, ease: "power2.out", paused: true });

    function tick(time: number) {
      if (disposed || !running) return;
      const interval = 1 / (mobile.matches ? 24 : 30);
      if (!lastFrame) lastFrame = time;
      if (time - lastFrame + 0.0001 < interval) return;
      const delta = Math.min(time - lastFrame, 0.08);
      lastFrame = time;
      clock += delta;
      for (const particle of mist) {
        particle.age += delta / particle.life;
        if (particle.age >= 1) particle.age -= 1;
      }
      for (const particle of ice) {
        particle.age += delta / particle.life;
        if (particle.age >= 1) particle.age -= 1;
      }
      draw();
    }

    function stop() {
      if (running) gsap.ticker.remove(tick);
      running = false;
      lastFrame = 0;
      intro.pause();
    }

    function syncPlayback() {
      if (disposed) return;
      if (reduced.matches) {
        stop();
        intro.progress(1).pause();
        draw(true);
        canvas!.dataset.airflowState = "static";
      } else if (ready && inView && !document.hidden) {
        if (!running) {
          running = true;
          lastFrame = 0;
          gsap.ticker.add(tick);
          intro.play();
        }
        canvas!.dataset.airflowState = "running";
      } else {
        stop();
        canvas!.dataset.airflowState = "paused";
      }
    }

    function resize() {
      if (disposed) return;
      const bounds = canvas!.getBoundingClientRect();
      const machine = unit!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      ratio = Math.min(window.devicePixelRatio || 1, mobile.matches ? 1.25 : 1.5);
      const pixelWidth = Math.max(1, Math.ceil(width * ratio));
      const pixelHeight = Math.max(1, Math.ceil(height * ratio));
      if (canvas!.width !== pixelWidth) canvas!.width = pixelWidth;
      if (canvas!.height !== pixelHeight) canvas!.height = pixelHeight;

      // Coordinates match the vent lip in the existing, unchanged local A/C photograph.
      ventWidth = machine.width * 0.82;
      ventX = machine.left - bounds.left + machine.width * 0.495;
      ventY = machine.top - bounds.top + machine.height * 0.855;
      travel = Math.max(40, height - ventY);
      if (mist.length !== (mobile.matches ? 20 : 32)) seedParticles();
      draw(reduced.matches);
      syncPlayback();
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.01 });
    observer.observe(canvas);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    sizeObserver.observe(unit);
    reduced.addEventListener("change", syncPlayback);
    mobile.addEventListener("change", resize);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", syncPlayback);
    unit.addEventListener("load", resize);
    texture.onload = () => {
      const softContext = softTexture.getContext("2d");
      if (softContext) {
        softContext.filter = "blur(9px)";
        softContext.drawImage(texture, 16, 16, 640, 213);
        softContext.filter = "none";
      }
      ready = true;
      resize();
    };
    texture.onerror = () => { stop(); canvas.dataset.airflowState = "unavailable"; };
    texture.src = "/images/freezing-mist.webp";
    resize();

    return () => {
      disposed = true;
      stop();
      intro.kill();
      observer.disconnect();
      sizeObserver.disconnect();
      reduced.removeEventListener("change", syncPlayback);
      mobile.removeEventListener("change", resize);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncPlayback);
      unit.removeEventListener("load", resize);
      texture.onload = texture.onerror = null;
    };
  }, [unitRef]);

  return <div className={styles.field} aria-hidden="true"><canvas ref={canvasRef} className={styles.canvas} data-freezing-airflow /></div>;
}
