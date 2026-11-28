"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { createVaporRenderer } from "./vapor-renderer";
import type { VaporFrame, VaporRenderer } from "./vapor-renderer";
import styles from "./vapor-field.module.css";

type Props = { direction?: "down" | "right"; unitRef?: RefObject<HTMLImageElement | null>; variant?: "section" | "transition" | "footer" };

export function VaporField({ direction = "right", unitRef, variant = "section" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hero = direction === "down";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)"), mobile = matchMedia("(max-width: 767px)");
    let renderer: VaporRenderer | undefined;
    let visible = false, disposed = false, contextLost = false, frameId = 0, previous = 0, accumulator = 0, time = 0;
    const frame: VaporFrame = { width: 1, height: 1, time: 0, strength: 0, horizontal: !hero, particles: 0, emitter: [0.5, 0, 0.8, 1] };

    function state(value: string) { if (root!.dataset.vaporState !== value) root!.dataset.vaporState = value; }
    function stop() { cancelAnimationFrame(frameId); frameId = previous = accumulator = 0; }
    function lost(event: Event) { event.preventDefault(); contextLost = true; stop(); state("context-lost"); }
    function restored() { contextLost = false; release(); sync(); }
    function release() {
      if (!renderer) return;
      renderer.canvas.removeEventListener("webglcontextlost", lost);
      renderer.canvas.removeEventListener("webglcontextrestored", restored);
      renderer.dispose(); renderer.canvas.remove(); renderer = undefined;
    }
    function initialize() {
      if (renderer || disposed) return;
      renderer = createVaporRenderer();
      renderer.canvas.className = styles.canvas;
      renderer.canvas.dataset.vaporCanvas = hero ? "hero" : variant;
      renderer.canvas.dataset.renderer = renderer.kind;
      renderer.canvas.addEventListener("webglcontextlost", lost);
      renderer.canvas.addEventListener("webglcontextrestored", restored);
      root!.append(renderer.canvas);
      measure();
    }
    function measure() {
      const bounds = root!.getBoundingClientRect();
      frame.width = Math.max(1, bounds.width); frame.height = Math.max(1, bounds.height);
      const machine = unitRef?.current?.getBoundingClientRect();
      if (machine) {
        const y = machine.top - bounds.top + machine.height * 0.875;
        frame.emitter = [(machine.left - bounds.left + machine.width * 0.48) / frame.width,
          y / frame.height, machine.width * 0.8 / frame.width, Math.max(30, frame.height - y) / frame.height];
      }
      if (renderer) {
        const ratio = Math.min(devicePixelRatio || 1, mobile.matches ? 0.9 : 1);
        const width = Math.ceil(frame.width * ratio), height = Math.ceil(frame.height * ratio);
        if (renderer.canvas.width !== width) renderer.canvas.width = width;
        if (renderer.canvas.height !== height) renderer.canvas.height = height;
      }
    }
    function draw(still = false) {
      if (!renderer || disposed) return;
      frame.time = still ? 2.4 : time;
      frame.strength = (hero ? 1.05 : variant === "footer" ? 0.43 : 0.36) * (still ? 0.42 : 1 - Math.exp(-time * 2.5));
      frame.particles = still ? 0 : mobile.matches ? 4 : 7;
      renderer.draw(frame);
    }
    function tick(now: number) {
      if (disposed) { stop(); return; }
      // Reconcile the preference in the loop too: browser media events may arrive after a frame.
      if (reduced.matches || !visible || document.hidden) { stop(); sync(); return; }
      const delta = previous ? Math.min(100, now - previous) : 0;
      previous = now; accumulator += delta; time += delta / 1000;
      const interval = 1000 / (renderer?.kind === "canvas2d" ? 18 : mobile.matches ? 24 : 30);
      if (accumulator >= interval) { accumulator %= interval; draw(); }
      frameId = requestAnimationFrame(tick);
    }
    function sync() {
      if (disposed) return;
      if (contextLost) { stop(); state("context-lost"); return; }
      if (reduced.matches) {
        stop();
        if (visible) { initialize(); draw(true); }
        state("static");
      } else if (visible && !document.hidden) {
        initialize();
        if (!frameId) frameId = requestAnimationFrame(tick);
        state("running");
      } else { stop(); state("paused"); }
    }
    function resize() { measure(); if (reduced.matches && visible) draw(true); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.01 });
    observer.observe(root);
    const sizes = new ResizeObserver(resize); sizes.observe(root);
    const unit = unitRef?.current;
    if (unit) sizes.observe(unit);
    unit?.addEventListener("load", resize);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    mobile.addEventListener("change", resize);
    measure();
    return () => {
      disposed = true; stop(); release(); observer.disconnect(); sizes.disconnect();
      unit?.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      mobile.removeEventListener("change", resize);
    };
  }, [hero, unitRef, variant]);

  return <div ref={rootRef} className={hero ? styles.hero : `${styles.edge} ${styles[variant]}`}
    data-vapor-field={hero ? "hero" : variant} data-vapor-state="paused" aria-hidden="true" />;
}
