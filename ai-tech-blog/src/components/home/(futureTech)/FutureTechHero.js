"use client";
import * as React from "react";

function FutureTechHero() {
  return (
    <section className="flex flex-col gap-4 justify-center items-start px-40 py-32 w-full border bg-zinc-900 border-neutral-800 max-md:p-20 max-sm:px-5 max-sm:py-16">
      <Badge>
        Unlock the Power of
      </Badge>
      <HeroHeading>
        FutureTech Features
      </HeroHeading>
    </section>
  );
}

function HeroHeading({ children, className = "" }) {
  return (
    <h1 className={`w-full text-6xl font-medium tracking-tighter text-white leading-[75.4px] max-md:text-5xl max-md:tracking-tighter max-sm:text-3xl max-sm:tracking-tighter ${className}`}>
      {children}
    </h1>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span className={`gap-2.5 px-2.5 py-1.5 text-xl font-medium tracking-tight leading-8 text-white rounded bg-zinc-800 max-md:text-lg max-md:tracking-tight max-sm:text-base max-sm:tracking-tight ${className}`}>
      {children}
    </span>
  );
}

export default FutureTechHero;
