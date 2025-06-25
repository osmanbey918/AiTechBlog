
export default function Home() {
  return (
    <div>
      <header className="flex relative flex-2 flex-col gap-8 max-lg:max-w-full  pt-24 max-md:pt-20 max-sm:pt-16 items-start max-w-[60%]  max-sm:gap-5">
        <p className="relative text-3xl tracking-tighter g-px leading-9 text-stone-500 max-md:text-2xl max-sm:text-xl max-sm:tracking-tight">
          Your Journey to Tomorrow Begins Here
        </p>
        <div className="flex relative flex-col gap-5 items-start g-px w-full pb-6">
          <h1 className="relative w-full text-[3.8rem] max-lg:text-6xl tracking-tighter text-white leading-[84px] max-md:text-5xl max-md:tracking-tighter max-sm:text-3xl max-sm:tracking-tighter">
            Explore the Frontiers of Artificial Intelligence
          </h1>
          <p className="relative w-full text-lg tracking-tight leading-7 text-zinc-500 max-md:text-base max-sm:text-sm max-sm:tracking-tight">
            Welcome to the epicenter of AI innovation. FutureTech AI News is your passport
            to a world where machines think, learn, and reshape the future. Join us on this
            visionary expedition into the heart of AI.
          </p>
        </div>
      </header>
    </div>
  );
}

