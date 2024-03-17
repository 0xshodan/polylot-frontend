import CardTemplate from "@/components/card-template"
import { Trash2, Heart, MoreHorizontal } from "lucide-react"
export function CardStackCard() {
    return <CardTemplate className="w-80 h-44 flex flex-col justify-between text-white p-5 pt-2">
        <div className="flex flex-row justify-between">
            <span className="font-semibold text-xl">Buildings. Useful Vocabulary asdasdsas </span>
            <MoreHorizontal className="size-9"/>
        </div>
        <div className="flex flex-row justify-between">
            <Trash2 className="size-5"/>
            <div className="flex flex-row">
                <span>1213</span>
                <Heart className="size-5"/>
            </div>
        </div>
    </CardTemplate>
}