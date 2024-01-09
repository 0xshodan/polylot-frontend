'use client'

import { useState, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';


export interface CardEntity {
    word: string,
    meaning: string,
    image?: string,
}
export enum Frame {
    Word,
    Meaning,
    Image,
}
interface CardProps {
    card: CardEntity,
    next: () => void,
}

export function Card ({card, next}: CardProps) {

    const [frame, setFrame] = useState(Frame.Word);
    const [flipped, setFlipped] = useState(false)
    useEffect(() => {
        setFrame(Frame.Word);
      }, [card]);
    const _flip = (state?: Frame) => {
        if (state === undefined) {
            state = frame;
        }
        switch (state) {
            case Frame.Word:
                if (card.meaning !== undefined) {
                    setFrame(Frame.Meaning);
                } else {
                    _flip(Frame.Meaning)
                }
                break;
            case Frame.Meaning:
                if (card.image !== undefined) {
                    setFrame(Frame.Image);
                } else {
                    _flip(Frame.Image)
                }
                break;
            case Frame.Image:
                if (card.word !== undefined) {
                    setFrame(Frame.Word);
                }
                else {
                    _flip(Frame.Word)
                }
                break;
        };
    };
    const flip = () => {
        _flip();
        setFlipped(!flipped);
    };
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            console.log("Still learning");
            next()
        },
        onSwipedRight: () => {
            console.log("Know");
            next()
        },
      });
    return <div className={`size-full rounded-3xl bg-purple-600 flex items-center justify-center cursor-pointer transition-transform ${flipped ? 'rotate-y-180' : ''} duration-300`} onClick={flip} {...handlers}>
        {(() => {
            switch (frame) {
                case Frame.Word:
                    return <h2 className={`duration-300 ${flipped ? 'rotate-y-180' : ''}`}>{card.word}</h2>;
                case Frame.Meaning:
                    return <h2 className={`duration-300 ${flipped ? 'rotate-y-180' : ''}`}>{card.meaning}</h2>;
                case Frame.Image:
                    return <Image src={card.image !== undefined ? "" : ""} alt="here image" className={`duration-300 ${flipped ? 'rotate-y-180' : ''}`}></Image>;
            };
        })()}
    </div>
}