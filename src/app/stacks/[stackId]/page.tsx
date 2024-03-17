'use client'

import { useCardsStore, useStacksStore } from "@/lib/store"
import { useEffect } from "react";


export default function StackPage({params}: {params: {stackId: string}}) {
    const stacks = useStacksStore(state => state.stacks);

    const cards = useCardsStore(state => state.cards);
    const error = useCardsStore(state => state.error);
    const fetchCards = useCardsStore(state => state.fetchMany);
    console.log(error);
    useEffect(() => {
        fetchCards(params.stackId);
    }, [])
    return <div>
    </div>
}