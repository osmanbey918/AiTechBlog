
function StatisticItem({ value, suffix, description }) {
  return (
    <div className="flex relative flex-col flex-1 gap-2.5 items-start py-12 max-md:py-10 max-sm:py-8">
      <div className="relative w-full text-4xl font-bold tracking-tighter text-yellow-400 leading-[60px] max-md:text-3xl max-sm:text-2xl max-sm:tracking-tighter">
        <span className="text-white">{value}</span>
        <span className="text-yellow-400">{suffix}</span>
      </div>
      <p className="relative w-full text-lg tracking-tight leading-7 text-neutral-400 max-md:text-base max-sm:text-sm max-sm:tracking-tight">
        {description}
      </p>
    </div>
  );
}
export default StatisticItem;