"use client";

import { repoList } from "@/lib/repoList";
import { GoLaw, GoStar } from "react-icons/go";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BSect from "@/components/ui/bsect";
import Button from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BDiv from "@/components/ui/bdiv";

import React, { use, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface GHRepos {
  name: string;
  description: string;
  url: string;
  license?: {
    name: string;
    logo: React.ReactElement;
  }
  stars: number;
  forks: number;
}

const GHSection = () => {
  return (
    <div className="2xl:px-120 xl:px-75 md:px-25 px-10 transition-padding transition-flex duration-200">
      <section className="flex flex-col text-6xl py-20">
        <BDiv
          className="flex text-6xl opacity-0 grow-162"
          threshold={0.5}
          direction="hor"
          distance={0}
          reverse={true}
          duration={1.5}
          opacity={0}
          scale={1}
          angle={0}
        >
          Github
        </BDiv>
        <BDiv
          className="flex mt-[10vh] flex-wrap min-h-screen lg:flex-row flex-col text-xl opacity-0 grow-200"
          threshold={0.5}
          direction="hor"
          distance={0}
          duration={1.5}
          opacity={0}
          scale={1}
          angle={0}
        >
          {repoList.map((rList) => (
            <div
              className="min-h-[20vh] min-w-[20vw] flex items-center grow-1 m-2"
              key={rList.name}
            >
              <Card className="flex w-full h-full border-1 border-(--foreground)/20 bg-(--foreground)/2 text-(--foreground) shadow-md">
                <CardHeader>
                  <CardTitle>{rList.name}</CardTitle>
                  <CardDescription>{rList.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow-100 flex-row"></CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button
                    variant="fancy"
                    className="w-full"
                    parallax
                    tiltFactor={0}
                    onClick={() => window.open(rList.html_url, "_blank")}
                  >
                    Github
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </BDiv>
      </section>
    </div>
  );
};

export default GHSection;