import Image from "next/image";
import { ViewAllButton } from "./sectionHeader/SectionHeader";

export default function SideSection() {
    return (
        <div className="relative border-neutral-800 w-full h-full overflow-hidden min-h-64">
            <Image
                src="/assets/bg.webp"
                alt="Decorative scene"
                fill
                className="object-cover object-center "
                priority={false}
            />

            <section className="flex gap-4 flex-col absolute bottom-10 z-10">
                <div className="flex h-auto pl-10 items-end max-sm:px-2">
                    <div className="flex border rounded-full px-2 py-1 items-end">
                        <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 rounded-full bg-red-500"></span>
                        <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 ml-[-12px] rounded-full bg-green-500"></span>
                        <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 ml-[-12px] rounded-full bg-blue-500"></span>
                        <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 ml-[-12px] rounded-full bg-yellow-500"></span>
                    </div>
                </div>

                <div className="pl-10 max-sm:px-2">
                    <p>Explore 1000+ resources</p>
                    <p>Over 1,000 articles on emerging tech trends and breakthroughs.</p>
                </div>

                <div className="pl-10 max-sm:px-2">
                    <ViewAllButton text={"Explore Resources"} />
                </div>
            </section>
        </div>
    );
}
