"use client";

import { useEffect, useMemo, useRef } from "react";
import s from "./InteractiveOracle.module.css";

export type OracleCard = {
  angle?: number;
  badge?: string;
  title: string;
  text: string;
};

type Props = {
  heading?: string;
  sub?: string;
  cards: OracleCard[];
  orbitSpeed?: number;
  ellipseY?: number;
  onCardClick?: (card: OracleCard, index: number) => void;
};

export default function InteractiveOracle({
  heading = "Architect Your Destiny",
  sub = "A living crystal sphere with orbiting insights.",
  cards,
  orbitSpeed = 0.08,
  ellipseY = 0.78,
  onCardClick,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dpr =
    typeof window !== "undefined"
      ? Math.min(2, window.devicePixelRatio || 1)
      : 1;
  const stars = useRef<
    { x: number; y: number; r: number; a: number; v: number }[]
  >([]);
  const rot = useRef(0);
  const parallax = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  const cardAngles = useMemo(() => {
    const n = cards.length || 1;
    return cards.map((c, i) => c.angle ?? i * (360 / n));
  }, [cards]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const rect = stageRef.current!.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const count = Math.floor((canvas.width * canvas.height) / (120 * 120));
      stars.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.2,
        a: Math.random(),
        v: Math.random() * 0.3 + 0.05,
      }));
      layoutCards();
    };

    const layoutCards = () => {
      const sphere = sphereRef.current!;
      const orbit = orbitRef.current!;
      const rect = sphere.getBoundingClientRect();
      const R = Math.min(rect.width, rect.height) * 0.42;

      Array.from(orbit.children).forEach((el, i) => {
        const base = cardAngles[i] ?? 0;
        const ang = ((base + rot.current) * Math.PI) / 180;
        const cx = rect.width / 2 + Math.cos(ang) * R;
        const cy = rect.height / 2 + Math.sin(ang) * R * ellipseY;
        const depth = (Math.sin(ang) + 1) / 2;

        const elStyle = (el as HTMLElement).style;
        elStyle.left = cx + "px";
        elStyle.top = cy + "px";
        elStyle.opacity = String(0.55 + depth * 0.45);
        elStyle.transform = `translate(-50%,-50%) scale(${0.92 + depth * 0.18})`;
        (el as HTMLElement).style.zIndex = String(10 + Math.floor(depth * 10));
      });
    };

    const drawStars = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars.current) {
        s.x -= s.v * (0.4 + parallax.current.x * 0.6);
        if (s.x < -10) s.x = canvas.width + 10;
        const alpha = 0.35 + 0.65 * Math.sin((t * 0.001 + s.a) * 2);
        ctx.beginPath();
        ctx.arc(s.x, s.y + parallax.current.y * 8, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${alpha})`;
        ctx.fill();
      }
    };

    const tick = (t: number) => {
      rot.current += orbitSpeed;
      layoutCards();
      drawStars(t);
      raf.current = requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      const r = sphereRef.current!.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      parallax.current = { x: nx * 2, y: ny * 2 };
      orbitRef.current!.style.transform = `translate(${nx * 8}px, ${ny * 8}px)`;
      const rings = sphereRef.current!.querySelector(
        `.${s.rings}`,
      ) as HTMLElement;
      if (rings)
        rings.style.transform = `rotate(${rot.current / 2}deg) translate(${nx * 4}px, ${ny * 4}px)`;
    };

    const onTilt = (e: DeviceOrientationEvent) => {
      const nx = (e.gamma ?? 0) / 45;
      const ny = (e.beta ?? 0) / 45;
      parallax.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    if (window.DeviceOrientationEvent)
      window.addEventListener("deviceorientation", onTilt, { passive: true });

    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current!);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      if (window.DeviceOrientationEvent)
        window.removeEventListener("deviceorientation", onTilt as any);
    };
  }, [cardAngles, dpr, ellipseY, orbitSpeed]);

  return (
    <section className={s.wrap} aria-label="Interactive Oracle">
      <div className={s.copy}>
        <h1 className={s.title}>{heading}</h1>
        <p className={s.sub}>{sub}</p>
      </div>
      <div ref={stageRef} className={s.stage}>
        <canvas ref={canvasRef} className={s.stars} />
        <div ref={sphereRef} className={s.sphere}>
          <div className={s.halo} />
          <div className={s.rings} />
          <div className={s.seal}>
            <div className={s.wave} />
            <div className={s.sealTitle}>Architect • Your • Destiny</div>
          </div>
          <div ref={orbitRef} className={s.orbit}>
            {cards.map((c, i) => (
              <div
                key={i}
                className={s.card}
                onClick={() => onCardClick?.(c, i)}
                aria-label={`${c.title}: ${c.text}`}
              >
                <span className={s.badge}>{c.badge ?? "✨"}</span>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className={s.ctaWrap}>
            <button className={s.cta}>Begin Your Journey</button>
          </div>
        </div>
      </div>
    </section>
  );
}
