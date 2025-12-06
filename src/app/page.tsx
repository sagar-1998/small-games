'use client';

import Games from '../games/page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-10 items-center min-w-2xl bg-zinc-50 font-sans ">
      <h1 className="text-4xl my-5">Games</h1>
      <Games />
    </div>
  );
}
