export const CATEGORIES = {
    AI: "AI",
    TECH: "Technology",
    DEV: "Development",
    RESEARCH: "Research",
    NEWS: "News"
};

export const POST_SECTIONS = {
    MAIN: {
        start: 0,
        end: 7
    },
    POPULAR: {
        start: 12,
        end: 16
    },
    MORE: {
        start: 7,
        end: 13
    }
};

export const DEFAULT_IMAGES = {
    COVER: '/assets/default-cover.jpg',
    AUTHOR: '/assets/default-avatar.jpg'
};

// export const REVALIDATION_TIME = 1800; // 30 minutes

export const METRICS_RANGES = {
    VIEWS: { min: 100, max: 1000 },
    COMMENTS: { min: 5, max: 50 },
    SHARES: { min: 10, max: 100 }
};
