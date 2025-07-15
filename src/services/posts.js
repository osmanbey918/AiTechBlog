import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';

export const postService = {
    async getAllPosts() {
        const slugs = await getAllPostSlugs();
        const posts = await Promise.all(
            slugs.map(async (slug) => this.transformPost(await getPostBySlug(slug), slug))
        );
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    transformPost(post, slug) {
        const authorData = this.getAuthorData(post.meta);
        return {
            slug,
            title: post.meta.title,
            image: post.meta.coverImage || '/assets/default-cover.jpg',
            description: post.meta.excerpt,
            category: post.meta.category || "AI",
            author: authorData.name,
            authorImage: authorData.image,
            authorSpecialty: authorData.specialty,
            datePublished: post.meta.jsonld?.datePublished || new Date().toISOString(),
            metrics: this.generateMetrics(),
            stats: this.generateMetrics(), // For consistency with existing code
        };
    },

    getAuthorData(meta) {
        const name = meta.jsonld?.author?.name || "Anonymous";
        return {
            name,
            image: meta.authorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            specialty: meta.category || "Technology"
        };
    },

    generateMetrics() {
        return {
            views: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 50),
            shares: Math.floor(Math.random() * 100)
        };
    }
};
