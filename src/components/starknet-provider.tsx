'use client';
import { ReactNode } from 'react';

import { devnet, goerli, mainnet } from '@starknet-react/chains';
import {
  StarknetConfig,
  argent,
  braavos,
  publicProvider,
  useInjectedConnectors,
  voyager,
} from '@starknet-react/core';
import { blastProvider } from '@starknet-react/core';
import dotenv from 'dotenv';

export function StarknetProvider({ children }: { children: ReactNode }) {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: 'onlyIfNoConnectors',
    // Randomize the order of the connectors.
    order: 'alphabetical',
  });

  const provider = blastProvider({
    apiKey: process.env.NEXT_PUBLIC_BLAST_KEY as string,
  });

  return (
    <StarknetConfig
      chains={[mainnet, goerli]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
