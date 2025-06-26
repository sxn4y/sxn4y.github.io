"use client"

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BSect from "@/components/ui/bsect";
import BDiv from "@/components/ui/bdiv";
import Silk from "@/components/ui/Silk";


import { use, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {});

  return (
    <div className="overflow-hidden bg-(--background)/50">
      <BSect
        className="h-screen relative flex items-center justify-center text-9xl opacity-0"
        threshold={0.6}
        direction="hor"
        distance={0}
        duration={1.5}
        opacity={0}
        scale={1.2}
        angle={0}
      >
        <Silk
          speed={3}
          scale={1.2}
          color="#003385"
          noiseIntensity={3}
          rotation={2}
        />
        <div className="absolute text-9xl text-white">Hello</div>
      </BSect>
      <div className="2xl:px-120 xl:px-75 md:px-25 px-2 transition-padding duration-200">
        <section className="h-screen flex text-6xl py-20">
          <BDiv
            className="flex text-6xl opacity-0"
            threshold={0.5}
            direction="hor"
            distance={400}
            reverse={true}
            duration={1.5}
            opacity={0}
            scale={1}
            angle={0}
          >
            Github
          </BDiv>
        </section>
      </div>
    </div>
  );
}