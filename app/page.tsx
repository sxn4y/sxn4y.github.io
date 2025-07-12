"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import BSect from "@/components/ui/bsect";
import BDiv from "@/components/ui/bdiv";
import Silk from "@/components/ui/Silk";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GHSection from "@/app/ui/GHSection";
import { Bebas_Neue, Geist_Mono } from "next/font/google";

import { use, useEffect } from "react";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create({ smooth: 1, effects: true, smoothTouch: 0.1 });
  });
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <BSect
          className="h-screen relative flex items-center justify-center text-9xl opacity-0 gr-1  bg-(--accent-1)/4 border-b border-(--accent-4)/50 rounded-b-[100px]"
          threshold={0.6}
          direction="hor"
          distance={0}
          duration={1.5}
          opacity={0}
          scale={1.2}
          angle={0}
        >
          {/* <Silk
          speed={0}
          scale={1.2}
          color="#003385"
          noiseIntensity={3}
          rotation={2}
        /> */}
          <div className="absolute xl:text-[3.5vw] md:text-[6vw] text-[12vw] text-center">
            THIS IS A WORK IN PROGRESS! 👋
          </div>
        </BSect>
        <GHSection />
      </div>
    </div>
  );
}
