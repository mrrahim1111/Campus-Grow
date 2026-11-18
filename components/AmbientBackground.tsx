"use client";

import React, { useEffect, useRef } from "react";

export type AmbientIntensity =
  | "landing"
  | "dashboard"
  | "catalog"
  | "lesson"
  | "mentor"
  | "project-hub"
  | "terminal"
  | "career";

interface AmbientBackgroundProps {
  intensity?: AmbientIntensity;
  children?: React.ReactNode;
  className?: string;
}

export default function AmbientBackground({
  intensity = "dashboard",
  children,
  className = "",
}: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cinematic interactive canvas simulation for liquid-glass waves & floating 3D glass spheres
  useEffect(() => {
    // Only run canvas animation on landing, dashboard, and mentor for maximum elegance without overhead
    const runCanvas = intensity === "landing" || intensity === "dashboard" || intensity === "mentor";
    if (!runCanvas) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Glass Spheres
    const sphereCount = intensity === "landing" ? 6 : 3;
    const spheres = Array.from({ length: sphereCount }, (_, i) => ({
      x: (width / (sphereCount + 1)) * (i + 1) + (Math.random() - 0.5) * 120,
      y: (height / (sphereCount + 1)) * (i + 1) + (Math.random() - 0.5) * 80,
      radius: 40 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: 0.18 + Math.random() * 0.15,
    }));

    // Floating Particles
    const particleCount = intensity === "landing" ? 35 : 18;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      vy: -0.2 - Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      alpha: 0.2 + Math.random() * 0.5,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));

    let time = 0;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // ── 1. Flowing Translucent Liquid-Glass Waves ──
      const waveCount = intensity === "landing" ? 3 : 2;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const baseHeight = height * (0.68 + w * 0.12);
        const waveFreq = 0.0018 + w * 0.0006;
        const waveSpeed = time * (1 + w * 0.6);

        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        for (let x = 0; x <= width; x += 15) {
          const y =
            baseHeight +
            Math.sin(x * waveFreq + waveSpeed) * 35 +
            Math.cos(x * 0.001 + waveSpeed * 0.8) * 20;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Mint-to-emerald translucent liquid gradient
        const waveGrad = ctx.createLinearGradient(0, baseHeight - 50, width, height);
        if (w === 0) {
          waveGrad.addColorStop(0, "rgba(185, 228, 201, 0.22)"); // Soft mint
          waveGrad.addColorStop(0.5, "rgba(117, 201, 154, 0.15)"); // Accent green
          waveGrad.addColorStop(1, "rgba(22, 134, 90, 0.12)"); // Primary green
        } else {
          waveGrad.addColorStop(0, "rgba(117, 201, 154, 0.14)");
          waveGrad.addColorStop(0.7, "rgba(11, 118, 80, 0.1)");
          waveGrad.addColorStop(1, "rgba(232, 245, 233, 0.05)");
        }

        ctx.fillStyle = waveGrad;
        ctx.fill();
      }

      // ── 2. Floating 3D Glass Spheres ──
      spheres.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.phase += 0.015;

        // Soft bounce within boundaries
        if (s.x - s.radius < -50 || s.x + s.radius > width + 50) s.vx *= -1;
        if (s.y - s.radius < -50 || s.y + s.radius > height + 50) s.vy *= -1;

        const currentRadius = s.radius + Math.sin(s.phase) * 3;

        // Spherical refractive radial gradient
        const sphereGrad = ctx.createRadialGradient(
          s.x - currentRadius * 0.35,
          s.y - currentRadius * 0.35,
          currentRadius * 0.05,
          s.x,
          s.y,
          currentRadius
        );
        sphereGrad.addColorStop(0, "rgba(255, 255, 255, 0.7)");
        sphereGrad.addColorStop(0.25, "rgba(185, 228, 201, 0.45)");
        sphereGrad.addColorStop(0.7, "rgba(117, 201, 154, 0.18)");
        sphereGrad.addColorStop(1, "rgba(22, 134, 90, 0.08)");

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.shadowColor = "rgba(11, 118, 80, 0.15)";
        ctx.shadowBlur = 18;
        ctx.fill();

        // 3D Glass Specular Highlight Arc
        ctx.beginPath();
        ctx.arc(s.x, s.y, currentRadius * 0.88, -Math.PI * 0.75, -Math.PI * 0.25);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.restore();
      });

      // ── 3. Subtle Glowing Particles & Gentle Light Trails ──
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.alpha += Math.sin(time * 2) * 0.005;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(117, 201, 154, ${Math.max(0.1, Math.min(0.65, p.alpha))})`;
        ctx.shadowColor = "rgba(22, 134, 90, 0.4)";
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  // Preset styles based on page context with dual-theme (Light & Dark) spatial lighting
  const getIntensityConfig = () => {
    switch (intensity) {
      case "landing":
        return {
          gridOpacity: "opacity-[0.04] dark:opacity-[0.07]",
          orb1: "bg-[#B9E4C9]/45 dark:bg-[#13C995]/25 w-[650px] h-[650px] -top-32 -left-32",
          orb2: "bg-[#75C99A]/30 dark:bg-[#55C8FF]/22 w-[680px] h-[680px] top-1/4 -right-48",
          orb3: "bg-[#E8F5E9]/60 dark:bg-[#101B2D]/40 w-[550px] h-[550px] bottom-10 left-1/3",
          showGrid: true,
          meshGlow: true,
        };
      case "dashboard":
        return {
          gridOpacity: "opacity-[0.03] dark:opacity-[0.06]",
          orb1: "bg-[#B9E4C9]/35 dark:bg-[#13C995]/20 w-[480px] h-[480px] -top-24 -left-24",
          orb2: "bg-[#75C99A]/25 dark:bg-[#55C8FF]/18 w-[500px] h-[500px] top-1/3 -right-36",
          orb3: "bg-[#E8F5E9]/50 dark:bg-[#13C995]/12 w-[420px] h-[420px] bottom-0 left-1/4",
          showGrid: true,
          meshGlow: false,
        };
      case "catalog":
        return {
          gridOpacity: "opacity-[0.03] dark:opacity-[0.05]",
          orb1: "bg-[#B9E4C9]/30 dark:bg-[#55C8FF]/18 w-[440px] h-[440px] -top-20 -right-20",
          orb2: "bg-[#75C99A]/25 dark:bg-[#13C995]/18 w-[480px] h-[480px] top-1/2 -left-32",
          orb3: "bg-emerald-200/20 dark:bg-slate-800/30 w-[380px] h-[380px] bottom-10 right-1/4",
          showGrid: true,
          meshGlow: false,
        };
      case "lesson":
        return {
          gridOpacity: "opacity-[0.02] dark:opacity-[0.035]",
          orb1: "bg-[#B9E4C9]/20 dark:bg-[#13C995]/14 w-[380px] h-[380px] -top-20 right-10",
          orb2: "bg-[#E8F5E9]/35 dark:bg-[#55C8FF]/12 w-[400px] h-[400px] top-1/2 -left-28",
          orb3: "bg-transparent w-0 h-0",
          showGrid: false,
          meshGlow: false,
        };
      case "mentor":
        return {
          gridOpacity: "opacity-[0.03] dark:opacity-[0.06]",
          orb1: "bg-[#B9E4C9]/35 dark:bg-[#13C995]/22 w-[450px] h-[450px] top-0 left-1/4",
          orb2: "bg-[#75C99A]/25 dark:bg-[#55C8FF]/16 w-[480px] h-[480px] bottom-12 right-10",
          orb3: "bg-teal-200/20 dark:bg-indigo-900/30 w-[380px] h-[380px] top-1/2 -left-20",
          showGrid: true,
          meshGlow: true,
        };
      case "project-hub":
        return {
          gridOpacity: "opacity-[0.035] dark:opacity-[0.07]",
          orb1: "bg-[#B9E4C9]/30 dark:bg-[#13C995]/18 w-[450px] h-[450px] -top-28 left-10",
          orb2: "bg-teal-300/20 dark:bg-[#55C8FF]/15 w-[400px] h-[400px] top-1/3 -right-20",
          orb3: "bg-[#75C99A]/20 dark:bg-[#101B2D]/40 w-[480px] h-[480px] bottom-0 left-1/3",
          showGrid: true,
          meshGlow: false,
        };
      case "terminal":
        return {
          gridOpacity: "opacity-[0.02] dark:opacity-[0.05]",
          orb1: "bg-[#B9E4C9]/20 dark:bg-[#13C995]/16 w-[360px] h-[360px] top-10 right-10",
          orb2: "bg-emerald-300/15 dark:bg-slate-800/40 w-[400px] h-[400px] bottom-10 left-10",
          orb3: "bg-transparent w-0 h-0",
          showGrid: true,
          meshGlow: false,
        };
      case "career":
        return {
          gridOpacity: "opacity-[0.035] dark:opacity-[0.06]",
          orb1: "bg-[#B9E4C9]/35 dark:bg-[#13C995]/22 w-[480px] h-[480px] -top-24 -left-20",
          orb2: "bg-[#75C99A]/25 dark:bg-[#55C8FF]/18 w-[450px] h-[450px] top-1/3 -right-24",
          orb3: "bg-emerald-200/20 dark:bg-[#101B2D]/35 w-[420px] h-[420px] bottom-10 left-1/3",
          showGrid: true,
          meshGlow: true,
        };
      default:
        return {
          gridOpacity: "opacity-[0.02] dark:opacity-[0.05]",
          orb1: "bg-[#B9E4C9]/30 dark:bg-[#13C995]/16 w-[400px] h-[400px] top-0 left-0",
          orb2: "bg-[#75C99A]/20 dark:bg-[#55C8FF]/16 w-[400px] h-[400px] top-1/2 right-0",
          orb3: "bg-transparent w-0 h-0",
          showGrid: true,
          meshGlow: false,
        };
    }
  };

  const config = getIntensityConfig();

  // Background decoration strictly fixed in the viewport, non-blocking, non-scroll-capturing
  const backgroundDecoration = (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dynamic Animated Liquid Glass Waves & 3D Glass Spheres Canvas */}
      {(intensity === "landing" || intensity === "dashboard" || intensity === "mentor") && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-70 dark:opacity-40 transition-opacity duration-1000"
        />
      )}

      {/* Subtle Spatial Dot Grid Pattern (Dark / Light adapt) */}
      {config.showGrid && (
        <div
          className={`absolute inset-0 bg-[radial-gradient(#16865A_1px,transparent_1px)] dark:bg-[radial-gradient(#55c8ff_1px,transparent_1px)] [background-size:26px_26px] ${config.gridOpacity} [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)]`}
        />
      )}

      {/* Spatial Fine Star Field (Dark Mode Ambient) */}
      <div className="hidden dark:block absolute inset-0 opacity-[0.14] bg-[radial-gradient(#ffffff_0.75px,transparent_0.75px)] [background-size:48px_48px]" />

      {/* Floating Gradient Orb 1 (Slow Drift) */}
      <div
        className={`absolute rounded-full blur-[110px] transform-gpu will-change-transform motion-reduce:transform-none motion-reduce:animate-none animate-float-slow-1 ${config.orb1}`}
      />

      {/* Floating Gradient Orb 2 (Cross Drift) */}
      <div
        className={`absolute rounded-full blur-[120px] transform-gpu will-change-transform motion-reduce:transform-none motion-reduce:animate-none animate-float-slow-2 ${config.orb2}`}
      />

      {/* Floating Gradient Orb 3 (Bottom Ambient Mesh) */}
      {config.orb3 && (
        <div
          className={`absolute rounded-full blur-[100px] transform-gpu will-change-transform motion-reduce:transform-none motion-reduce:animate-none animate-float-slow-3 ${config.orb3}`}
        />
      )}

      {/* Subtle linear shimmer on hero edges */}
      {config.meshGlow && (
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#16865A]/10 via-[#75C99A]/5 dark:from-[#13C995]/10 dark:via-[#55C8FF]/5 to-transparent" />
      )}

      {/* Soft translucent veil to ensure pristine text contrast */}
      <div className="absolute inset-0 bg-[#E8F5E9]/30 dark:bg-transparent backdrop-blur-[0.5px]" />
    </div>
  );

  // If used as a standalone background element without children
  if (!children) {
    return backgroundDecoration;
  }

  // Wrapper without overflow-hidden so scroll events and scroll offsets are completely natural
  return (
    <div className={`relative w-full ${className}`}>
      {backgroundDecoration}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
