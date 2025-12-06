'use client';

import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Square = { id: string; hasMole: boolean };

const GRID_SIZE = 9;
const INITIAL_TIME = 10;

const WackAMole: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  const [squares, setSquares] = useState<Square[]>(
    Array.from({ length: GRID_SIZE }, () => ({ id: uuidv4(), hasMole: false }))
  );

  // gameState: 0 = idle/stopped, 1 = playing, 2 = paused
  const [gameState, setGameState] = useState<0 | 1 | 2>(0);

  // refs for interval IDs so we can clear them reliably
  const moleIntervalRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // helper: place mole on a random square (pure functional update)
  const placeRandomMole = () => {
    setSquares((prev) => {
      const next = prev.map((s) => ({ ...s, hasMole: false }));
      const idx = Math.floor(Math.random() * next.length);
      next[idx] = { ...next[idx], hasMole: true };
      return next;
    });
  };

  // start playing: set up intervals (timer + mole)
  const startGame = () => {
    // if already playing, do nothing
    if (gameState === 1) return;

    setGameState(1);
    // ensure clean state when starting
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setSquares((prev) => prev.map((s) => ({ ...s, hasMole: false })));

    // place initial mole immediately
    placeRandomMole();

    // timer interval: functional update avoids stale closure
    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // when time reaches 0 we stop the game
          clearIntervals();
          setGameState(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // mole movement every second (can be adjusted)
    moleIntervalRef.current = window.setInterval(() => {
      placeRandomMole();
    }, 1000);
  };

  // pause/unpause
  const togglePause = () => {
    if (gameState !== 1) {
      // Resume if paused and time left
      if (gameState === 2 && timeLeft > 0) {
        // restart intervals
        setGameState(1);
        // mole & timer intervals (same as in startGame but without resetting score/time)
        timerIntervalRef.current = window.setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearIntervals();
              setGameState(0);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        moleIntervalRef.current = window.setInterval(() => {
          placeRandomMole();
        }, 1000);
      } else {
        // if idle, start game
        startGame();
      }
    } else {
      // pause: clear intervals and set paused state
      clearIntervals();
      setGameState(2);
    }
  };

  // stop and reset
  const stopGame = () => {
    clearIntervals();
    setGameState(0);
    setTimeLeft(INITIAL_TIME);
    setScore(0);
    setSquares((prev) => prev.map((s) => ({ ...s, hasMole: false })));
  };

  // clear both intervals helper
  const clearIntervals = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (moleIntervalRef.current) {
      clearInterval(moleIntervalRef.current);
      moleIntervalRef.current = null;
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      clearIntervals();
    };
  }, []);

  // mole click handler — use index to check state (not DOM)
  const handleSquareClick = (idx: number) => {
    // only count hits when playing
    if (gameState !== 1) return;

    setSquares((prev) => {
      const next = prev.map((s) => ({ ...s })); // shallow copy
      if (next[idx].hasMole) {
        // hit: remove mole immediately and increment score
        next[idx].hasMole = false;
        setScore((p) => p + 1);
      }
      return next;
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-6">
        <div>
          <div className="text-sm text-gray-500">Your Score</div>
          <div className="text-2xl font-semibold">{score}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Time Left</div>
          <div className="text-2xl font-semibold">{timeLeft}</div>
        </div>

        <div className="ml-auto flex gap-2">
          <button
            onClick={togglePause}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {gameState === 1 ? 'Pause' : gameState === 2 ? 'Resume' : 'Play'}
          </button>
          <button
            onClick={stopGame}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Stop
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-[360px]">
        {squares.map((sq, idx) => (
          <div
            key={sq.id}
            onClick={() => handleSquareClick(idx)}
            className="h-[100px] flex items-center justify-center border rounded text-3xl cursor-pointer select-none"
            style={{ background: sq.hasMole ? '#fde68a' : '#fff' }}
            aria-label={`square-${idx}`}
          >
            {sq.hasMole ? '🐹' : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WackAMole;
