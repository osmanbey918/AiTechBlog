import * as React from "react";

function LegalLinks() {
  return (
    <div className="flex gap-2 items-center max-sm:flex-wrap max-sm:justify-center">
      <p className="text-sm tracking-tight leading-5 text-stone-500">
        Terms &amp; Conditions
      </p>
      <div className="w-px bg-neutral-800 h-[18px]" />
      <p className="text-sm tracking-tight leading-5 text-stone-500">
        Privacy Policy
      </p>
    </div>
  );
}

export default LegalLinks;
