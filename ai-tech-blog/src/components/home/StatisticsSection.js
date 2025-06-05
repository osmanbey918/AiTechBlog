import StatisticItem from "./StatisticItem";
import React from "react";
function StatisticsSection() {
  const statistics = [
    { value: "300", suffix: "+", description: "Resources available" },
    { value: "12k", suffix: "+", description: "Total Downloads" },
    { value: "10k", suffix: "+", description: "Active Users" }
  ];

  return (
    <section className="flex relative gap-12 items-start pr-5 pl-40 w-full border border-neutral-800 max-md:gap-8 max-md:pl-20 max-sm:flex-col max-sm:gap-5 max-sm:px-4">
      {statistics.map((stat, index) => (
        <React.Fragment key={index}>
          <StatisticItem
            value={stat.value}
            suffix={stat.suffix}
            description={stat.description}
          />
          {index < statistics.length - 1 && (
            <div className="relative w-px bg-neutral-800 h-[200px] max-md:h-[150px] max-sm:w-full max-sm:h-px" />
          )}
        </React.Fragment>
      ))}
    </section>
  );
}
export default StatisticsSection;