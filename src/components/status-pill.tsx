import {cn} from "@/lib/utils"

export default function StatusPill({status}: {status: string}) {
    return (<button className={cn("rounded-l-lg cursor-default font-bold",
        {"bg-yellow-400 py-1 px-4 text-black": status == "נעדר"},
        {"bg-red-400 py-2 px-4 text-black": status == "נפל"},
        {"bg-green-400 py-2 px-4 text-black": status == "אותר"},
        {"bg-red-400 py-1 px-4 text-black": status == "חטוף"},
    )}>
        {status}
    </button>)

}