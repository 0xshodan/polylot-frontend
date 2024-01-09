'use client'

import {Card, CardEntity} from "./card";
import { useState } from 'react';
interface CardStackProps {
    className: string,
}

export function CardStack ({className}: CardStackProps) {
    const [currentCard, setcurrentCard] = useState(0)
    const cards:Array<CardEntity> = [
        {
            word: "tree",
            meaning: "something tall",
            image: "/asd"
        },
        {
            word: "milk",
            meaning: "white and tasty",
            image: "/asd"
        },
    ]
    const next = () => setcurrentCard((currentCard + 1) % cards.length);
    return <div className={`size-64 lg:size-96 ${className}`}>
        <Card card={cards[currentCard]} next={next}></Card>
    </div>
}