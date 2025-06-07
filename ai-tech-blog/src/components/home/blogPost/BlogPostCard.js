import React from 'react';

function AuthorProfile({ image, name, specialty }) {
    return (
        <div className="flex flex-col items-center gap-4 max-sm:flex-row max-sm:gap-3">
            <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
            <div className="text-center max-sm:text-left">
                <p className="text-white font-semibold text-lg">{name}</p>
                <p className="text-neutral-400 text-sm">{specialty}</p>
            </div>
        </div>
    );
}

function BlogContent({ date, title, description }) {
    return (
        <div className="flex flex-col flex-1 gap-6 items-start max-sm:gap-4 max-sm:w-full">
            <time className="w-full text-lg font-bold tracking-tight leading-7 text-neutral-400 max-sm:text-base max-sm:tracking-tight">
                {date}
            </time>
            <div className="flex flex-col gap-1.5 items-start w-full">
                <h2 className="w-full text-2xl font-bold tracking-tighter leading-8 text-white max-sm:text-lg max-sm:tracking-tight">
                    {title}
                </h2>
                <p className="w-full text-base tracking-tight leading-6 text-neutral-400 max-sm:text-sm max-sm:tracking-tight">
                    {description}
                </p>
            </div>
        </div>
    );
}

function BlogMetrics({ likes, comments, shares }) {
    return (
        <div className="flex gap-2 items-start max-sm:flex-wrap">
            {[{
                icon: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none"><path d="M9.70414 17.9255L9.6987 17.9226L9.67982 17.9124C9.66375 17.9037 9.64076 17.8911 9.61131 17.8746C9.55243 17.8418 9.4677 17.7937 9.3608 17.7308C9.14708 17.605 8.84431 17.4199 8.48212 17.1791C7.75895 16.6984 6.79268 15.9917 5.82383 15.0886C3.90651 13.3013 1.875 10.6459 1.875 7.375C1.875 4.93495 3.928 3 6.40625 3C7.86365 3 9.1686 3.66591 10 4.70966C10.8314 3.66591 12.1363 3 13.5938 3C16.072 3 18.125 4.93495 18.125 7.375C18.125 10.6459 16.0935 13.3013 14.1762 15.0886C13.2073 15.9917 12.241 16.6984 11.5179 17.1791C11.1557 17.4199 10.8529 17.605 10.6392 17.7308C10.5323 17.7937 10.4476 17.8418 10.3887 17.8746C10.3592 17.8911 10.3363 17.9037 10.3202 17.9124L10.3013 17.9226L10.2959 17.9255L10.2936 17.9268C10.1103 18.0241 9.88974 18.0241 9.70644 17.9268L9.70414 17.9255Z" fill="#FF5500"/></svg>`,
                count: likes
            }, {
                icon: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none"><path d="M7.07167 16.4907L...Z" stroke="#666" stroke-width="1.5"/></svg>`,
                count: comments
            }, {
                icon: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none"><path d="M8.36554 12.1347L...Z" fill="#FFD11A"/></svg>`,
                count: shares
            }].map((metric, index) => (
                <div
                    key={index}
                    className="flex gap-0.5 justify-center items-center px-3 py-1.5 border bg-zinc-900 border-neutral-800 rounded-[100px]"
                >
                    <div dangerouslySetInnerHTML={{ __html: metric.icon }} />
                    <span className="text-sm tracking-tight leading-5 text-neutral-400">{metric.count}</span>
                </div>
            ))}
        </div>
    );
}

function ViewBlogButton({ onClick }) {
    return (
        <button
            className="flex gap-1 items-center px-5 py-3.5 rounded-lg border bg-neutral-900 border-neutral-800 max-sm:justify-center max-sm:w-full"
            onClick={onClick}
        >
            <span className="text-sm tracking-tight leading-5 text-neutral-400">View Blog</span>
            <div dangerouslySetInnerHTML={{
                __html:
                    `<svg width="20" height="21" viewBox="0 0 20 21" fill="none"><path d="M6.875 3.625L16.25 3.625C16.4158 3.625 16.5747 3.69085 16.6919 3.80806C16.8092 3.92527 16.875 4.08424 16.875 4.25V13.625C16.875 13.9702 16.5952 14.25 16.25 14.25C15.9048 14.25 15.625 13.9702 15.625 13.625V5.75888L4.19194 17.1919C3.94786 17.436 3.55214 17.436 3.30806 17.1919C3.06398 16.9479 3.06398 16.5521 3.30806 16.3081L14.7411 4.875L6.875 4.875C6.52982 4.875 6.25 4.59518 6.25 4.25C6.25 3.90482 6.52982 3.625 6.875 3.625Z" fill="#FFD11A"/></svg>`
            }} />
        </button>
    );
}

function BlogPostCard({
    authorImage,
    authorName,
    authorSpecialty,
    date,
    title,
    description,
    likes,
    comments,
    shares,
    onViewBlog,
}) {
    return (
        <article className="flex gap-10 items-start g-px py-16 w-full border border-neutral-800 max-md:py-10 max-sm:flex-col max-sm:gap-5 max-sm:py-8">
            <AuthorProfile image={authorImage} name={authorName} specialty={authorSpecialty} />

            <div className="flex flex-1 gap-10 items-start max-sm:flex-col max-sm:gap-5 max-sm:items-start max-sm:w-full">
                <div className="flex flex-col gap-6 max-sm:gap-4 w-full">
                    <BlogContent date={date} title={title} description={description} />
                    <BlogMetrics likes={likes} comments={comments} shares={shares} />
                </div>

                <div className="flex flex-col items-end max-sm:items-start">
                    <ViewBlogButton onClick={onViewBlog} />
                </div>
            </div>
        </article>

    );
}

export default BlogPostCard;
