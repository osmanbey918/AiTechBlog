import StatCard from './StatCard';
import React from 'react';
const StatsSection = () => {
    const handleNewsClick = () => {
        console.log('News section clicked');
    };

    const handleExpertsClick = () => {
        console.log('Experts section clicked');
    };

    const handleGlobalClick = () => {
        console.log('Global section clicked');
    };

    const statsData = [
        {
            iconType: 'news',
            title: 'Latest News Updates',
            subtitle: 'Stay Current',
            description: 'Over 1,000 articles published monthly',
            onClick: handleNewsClick
        },
        {
            iconType: 'experts',
            title: 'Expert Contributors',
            subtitle: 'Trusted Insights',
            description: '50+ renowned AI experts on our team',
            onClick: handleExpertsClick
        },
        {
            iconType: 'global',
            title: 'Global Readership',
            subtitle: 'Worldwide Impact',
            description: '2 million monthly readers',
            onClick: handleGlobalClick
        }
    ];
    const Separator = () => {
        return (
            <div className="relative w-px bg-neutral-800 h-[] max-md:h-[241px] max-sm:w-full max-sm:h-px" />
        );
    };
    return (
        <section className="flex relative gap-20 items-start g-px w-full border border-neutral-800 max-md:gap-10 max-sm:flex-col max-sm:gap-5">
            {statsData.map((stat, index) => (
                <React.Fragment key={index}>
                    <StatCard
                        iconType={stat.iconType}
                        title={stat.title}
                        subtitle={stat.subtitle}
                        description={stat.description}
                        onButtonClick={stat.onClick}
                    />
                    {index < statsData.length - 1 && <Separator />}
                </React.Fragment>
            ))}
        </section>
    );
};

export default StatsSection;
