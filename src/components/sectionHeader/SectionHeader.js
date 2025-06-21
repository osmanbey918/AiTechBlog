"use client";
import * as React from "react";
import Image from "next/image";

const SectionHeader = ({ badge, heading, buttonText }) => {
  return (
    <section className="flex gap-52 items-center py-12 w-full border bg-zinc-900 border-neutral-800 g-px max-md:gap-24 max-sm:flex-col max-sm:gap-10 max-sm:p-4">
      <div className="flex flex-col flex-1 gap-2.5 justify-center items-start max-sm:w-full">
        {badge && <Badge>{badge}</Badge>}
        {heading && (
          <h1 className="w-full text-5xl tracking-tighter text-white leading-[57.2px] max-md:text-4xl max-md:tracking-tighter max-sm:text-3xl max-sm:tracking-tighter">
            {heading}
          </h1>
        )}
      </div>

      {buttonText && <ViewAllButton text={buttonText} />}
    </section>
  );
};

export const ViewAllButton = ({ text }) => {
  return (
    <button className="flex gap-1 items-center px-5 py-3.5 rounded-lg border bg-neutral-900 border-neutral-800 max-sm:justify-center max-sm:w-full">
      <span className="text-sm tracking-tight leading-5 text-neutral-400">{text}</span>
      <Image
        src="/assets/arrow-up-right.svg"
        alt="arrow icon"
        width={15}
        height={15}
        className="ml-2"
      />
    </button>
  );
};

const Badge = ({ children }) => {
  return (
    <div className="gap-2.5 px-2 py-1 text-base tracking-tight leading-6 text-white rounded bg-zinc-800 max-sm:text-sm max-sm:tracking-tight">
      {children}
    </div>
  );
};

export default SectionHeader;
