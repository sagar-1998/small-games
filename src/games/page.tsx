'use client';

import React from 'react';
import RockPaperScissor from './mini-games/RockPaperScissor/RockPaperScissor';
import MemoryGame from './mini-games/MemoryGame';

const Games = () => {
  return (
    <div>
      {/* <RockPaperScissor /> */}
      <MemoryGame />
    </div>
  );
};

export default Games;
