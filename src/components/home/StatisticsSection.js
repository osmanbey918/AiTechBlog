import React from "react";
function StatisticsSection() {
  const statistics = [
    { value: "300", suffix: "+", description: "Resources available" },
    { value: "12k", suffix: "+", description: "Total Downloads" },
    { value: "10k", suffix: "+", description: "Active Users" }
  ];

  return (
    <section className="flex flex-1 flex-grow justify-between w-full ">
      {statistics.map((stat, index) => (
        <React.Fragment key={index}>
          <StatisticItem
            value={stat.value}
            suffix={stat.suffix}
            description={stat.description}
          />
        </React.Fragment>
      ))}
    </section>
  );
}
export default StatisticsSection;




function StatisticItem({ value, suffix, description }) {
  return (
    <div className="flex relative flex-col flex-1 gap-2.5 items-start py-6 min-h-[130px] md:py-4 sm:py-2 border border-neutral-800 g-px">

      <div className="relative w-full font-bold leading-tight tracking-tight text-[2rem] max-sm:text-[1.5rem]">
        <span className="text-white">{value}</span>
        <span className="text-yellow-400">{suffix}</span>
      </div>

      <p className="relative w-full text-neutral-400 text-[1rem] leading-relaxed tracking-tight max-sm:text-[0.8rem]">
        {description}
      </p>
    </div>

  );
}
