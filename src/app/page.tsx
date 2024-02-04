'use client';

import Cyberpunk from 'public/cyberpunk.jpg';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Nimbora from '@/components/Nimbora';
import Yield from '@/components/Yield';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-12">
      <Image
        alt="Cyberpunk theme"
        src={Cyberpunk}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>
      <Yield />
      <Nimbora />
    </main>
  );
}
