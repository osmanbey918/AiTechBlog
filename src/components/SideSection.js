import Image from "next/image";

export default function SideSection() {
    return (
        <div className="flex border border-neutral-800 w-full min-h-[628px]">
            <div className="w-full h-[500px] max-w-[500px] absolute  bg-no-repeat bg-cover bg-center opacity-80 " style={{ backgroundImage: "url('/assets/bg.svg')" }}></div>
            <div className="flex gap-2 w-full h-auto max-w-[500px] items-end ">
                <span className="w-12 h-12 rounded-full bg-red-500"></span>
                <span className="w-12 h-12 rounded-full bg-green-500"></span>
                <span className="w-12 h-12 rounded-full bg-blue-500"></span>
                <span className="w-12 h-12 rounded-full bg-yellow-500"></span>
            </div>
        </div>
    )
}
