export function CategoryBadge({ category }) {
    return (
        <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full text-yellow-400 w-auto">
            {category}
        </span>
    );
}

export function MetricsDisplay({ views, comments, shares }) {
    return (
        <div className="flex items-center text-xs text-neutral-500 gap-3">
            <span className="flex items-center gap-1">
                <EyeIcon /> {views}
            </span>
            {comments && (
                <>
                    <span className="text-neutral-600">|</span>
                    <span>{comments} comments</span>
                </>
            )}
            {shares && (
                <>
                    <span className="text-neutral-600">|</span>
                    <span>{shares} shares</span>
                </>
            )}
        </div>
    );
}

export function AuthorInfo({ name, specialty, date }) {
    return (
        <div className="flex items-center text-xs text-neutral-500 gap-3 flex-wrap">
            <span className="text-gray-400 font-medium">{name}</span>
            {specialty && <span>{specialty}</span>}
            {date && (
                <>
                    <span className="text-neutral-600">|</span>
                    <span>{formatDate(date)}</span>
                </>
            )}
        </div>
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function EyeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
            />
        </svg>
    );
}
