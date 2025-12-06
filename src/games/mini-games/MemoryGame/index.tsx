'use client';

import React, { useEffect, useState } from 'react';
import { RANDOM_ARRAY } from './data/mockData';
import Image from 'next/image';
import blank from '../../../../public/games/mini-games/MemoryGame/data/blank.png';
import white from '../../../../public/games/mini-games/MemoryGame/data/white.png';

interface Card {
  name: string;
  img: string;
  id: string;
}

const MemoryGame: React.FC = () => {
  // 0 = hidden, 1 = revealed, 2 = matched
  const [isRevealed, setIsRevealed] = useState<number[]>(
    Array(RANDOM_ARRAY.length).fill(0)
  );

  const [cardsChosen, setCardsChosen] = useState<
    Array<{ idx: number; card: Card }>
  >([]);

  const [isChecking, setIsChecking] = useState(false);
  const [itemsArray] = useState<Card[]>(RANDOM_ARRAY);

  const [isGameComplete, setIsGameComplete] = useState(false);

  // --------------------------
  // FLIP CARD
  // --------------------------
  const flipCard = (idx: number, card: Card) => {
    if (isChecking) return;
    if (isRevealed[idx] === 2) return; // already matched
    if (isRevealed[idx] === 1) return; // already flipped
    if (cardsChosen.some((c) => c.idx === idx)) return; // clicked twice

    // Reveal the tile
    setIsRevealed((prev) => {
      const next = [...prev];
      next[idx] = 1;
      return next;
    });

    // Add card to chosen
    setCardsChosen((prev) => [...prev, { idx, card }]);
  };

  // --------------------------
  // CHECK MATCH AFTER 2 CARDS
  // --------------------------
  useEffect(() => {
    if (cardsChosen.length !== 2) return;

    setIsChecking(true);
    const [first, second] = cardsChosen;
    const isMatch = first.card.name === second.card.name;

    if (isMatch) {
      const t = setTimeout(() => {
        setIsRevealed((prev) => {
          const next = [...prev];
          next[first.idx] = 2;
          next[second.idx] = 2;
          return next;
        });

        setCardsChosen([]);
        setIsChecking(false);
        clearTimeout(t);
      }, 600);
    } else {
      const t = setTimeout(() => {
        setIsRevealed((prev) => {
          const next = [...prev];
          next[first.idx] = 0;
          next[second.idx] = 0;
          return next;
        });

        setCardsChosen([]);
        setIsChecking(false);
        clearTimeout(t);
      }, 900);
    }
  }, [cardsChosen]);

  // --------------------------
  // CHECK GAME COMPLETE
  // --------------------------
  useEffect(() => {
    if (isRevealed.every((val) => val === 2)) {
      setIsGameComplete(true);
    }
  }, [isRevealed]);

  // --------------------------
  // UI
  // --------------------------
  const createBoard = () => {
    return itemsArray.map((item, idx) => (
      <div key={item.id} className="m-2 w-[120px] h-[120px]">
        <button
          onClick={() => flipCard(idx, item)}
          disabled={isChecking || isRevealed[idx] === 2}
          className="w-full h-full bg-transparent border-none p-0 cursor-pointer"
        >
          <Image
            src={
              isRevealed[idx] === 0
                ? blank
                : isRevealed[idx] === 1
                ? item.img
                : white
            }
            alt={item.name}
            width={120}
            height={120}
          />
        </button>
      </div>
    ));
  };

  return (
    <div className="w-screen p-4 flex flex-col items-center">
      <div className="flex flex-wrap max-w-[520px]">{createBoard()}</div>

      {isGameComplete && (
        <div className="mt-6 text-2xl font-semibold text-green-600 animate-bounce">
          🎉 Congratulations! You matched all the cards! 🎉
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
