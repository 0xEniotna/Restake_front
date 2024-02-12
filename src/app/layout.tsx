import type { Metadata } from 'next';
import { StarknetProvider } from '@/components/starknet-provider';
import './globals.css';
import Cyberpunk from '../../public/cyberpunk.jpg';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Nimbora from '@/components/Nimbora';
import Yield from '@/components/Yield';

export const metadata: Metadata = {
  title: 'Juice Fountain',
  description: 'Access juicy L1 restaking yield',
};

import { Iceberg } from 'next/font/google';

const iceberg = Iceberg({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="custom">
      <body className={iceberg.className}>
        <StarknetProvider>
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
            <div className="absolute z-20 top-0 w-full">
              <Navbar />
            </div>
            {children}
          </main>
        </StarknetProvider>
      </body>
    </html>
  );
}
