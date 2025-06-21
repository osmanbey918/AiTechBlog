import { ViewAllButton } from "./sectionHeader/SectionHeader";

export default function SideSection() {
    return (
        <div className=" relative border-neutral-800 w-full min-h-[600px]">
            <div
                className="w-full h-[500px] bg-no-repeat bg-cover bg-center absolute opacity-80"
                style={{ backgroundImage: "url('/assets/bg.svg')" }}
            ></div>

            <section className="flex gap-4 flex-col absolute bottom-10">
                <div className="flex h-auto pl-10 items-end">
                    <div className="flex border rounded-full px-2 py-1 items-end">
                        <span className="w-12 h-12 rounded-full bg-red-500"></span>
                        <span className="w-12 h-12 ml-[-12px] rounded-full bg-green-500"></span>
                        <span className="w-12 h-12 ml-[-12px] rounded-full bg-blue-500"></span>
                        <span className="w-12 h-12 ml-[-12px] rounded-full bg-yellow-500"></span>
                    </div>
                </div>

                <div className="pl-10">
                    <p>Explore 1000+ resources</p>
                    <p>Over 1,000 articles on emerging tech trends and breakthroughs.</p>
                </div>

                <div className="pl-10">
                    <ViewAllButton text={"Explore Resources"} />
                </div>
            </section>
        </div>

    )
}
