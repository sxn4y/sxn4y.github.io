"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface BDivProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  opacity?: number;
  scale?: number;
  angle?: number;
  threshold?: number;
  distance?: number;
  reverse?: boolean;
  ease?: string;
  direction?: "hor" | "ver";
}

const BDiv: React.FC<BDivProps> = ({
  children,
  duration = 0.8,
  delay = 0,
  className = "",
  opacity = "0.2",
  scale = 1,
  angle = 0,
  threshold = 0.1,
  distance = 100,
  reverse = false,
  ease = "power3.out",
  direction = "ver",
}) => {
  const ref = useRef(null);
  const axis = direction === "hor" ? "x" : "y";
  const offset = reverse ? -distance : distance;
  const rotation = reverse ? -angle : angle;
  const percent = (1 - threshold) * 100;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${percent}%`,
        end: "bottom +=50px",
        once: false,
      },
    });

    tl.set(el, {
      [axis]: offset,
      scale,
      opacity: opacity,
      rotate: rotation,
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration,
      ease,
      delay,
    });
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default BDiv;