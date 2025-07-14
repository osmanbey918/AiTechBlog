
export default function NewsLetter() {
    return (
        <section className="py-16 px-4 text-white text-center">
            <div className="g-px max-w-64">
                <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
                <p className="text-neutral-300 mb-6">
                    Get the latest updates and curated articles delivered to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 w-full max-w-md sm:w-2/3 rounded bg-neutral-100 text-black"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    )
}
