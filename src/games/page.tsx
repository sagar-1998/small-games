'use client';

import React from 'react';
import RockPaperScissor from './mini-games/RockPaperScissor/RockPaperScissor';
import MemoryGame from './mini-games/MemoryGame';
import WackAMole from './mini-games/Wack-a-mole';

const Games = () => {
  return (
    <div className="flex justify-center items-center">
      {/* <RockPaperScissor /> */}
      {/* <MemoryGame /> */}
      <WackAMole />
    </div>
  );
};

export default Games;
