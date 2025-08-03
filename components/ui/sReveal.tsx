"use client";

import { ReactNode, use, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface sRevealProps {
  children?: ReactNode;

  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
  opacity?: number;
  scale?: number;
  angle?: number;
  threshold?: number;
  distance?: number;
  reverse?: boolean;
  ease?: string;
  direction?: "hor" | "ver";
  inline?: boolean;
}

const SReveal: React.FC<sRevealProps> = ({
  children,

  duration = 0.8,
  delay = 0,
  once = false,
  className = "",
  opacity = "0.2",
  scale = 1,
  angle = 0,
  threshold = 0.1,
  distance = 100,
  reverse = false,
  ease = "power3.out",
  direction = "ver",
  inline = false,
}) => {
  const ref = useRef(null);
  const axis = direction === "hor" ? "x" : "y";
  const offset = reverse ? -distance : distance;
  const rotation = reverse ? -angle : angle;
  const percent = (1 - threshold) * 100;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tl = once
      ? gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: `top ${percent}%`,
            end: `bottom +=50px`,
          },
        })
      : gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: `top ${percent}%`,
            end: `bottom +=50px`,
            onEnter: () => {
              tl.restart();
            },
            onLeave: () => {
              tl.pause(0);
            },
            onEnterBack: () => {
              tl.restart();
            },
            onLeaveBack: () => {
              tl.pause(0);
            },
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

  return <div ref={ref} className={`${className} ${inline ? "inline" : "block"}`}>{children}</div>;
};

export default SReveal;
