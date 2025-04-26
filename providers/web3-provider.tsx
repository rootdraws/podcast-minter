// Web3 Provider Component
// This file sets up the core Web3 infrastructure using RainbowKit and Wagmi
'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, sepolia } from 'wagmi/chains';

// WalletConnect Project ID - used for connecting to various wallets
// Falls back to a test ID if environment variable is not set
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c4658e5f5c3f16c35e6c6f5f8c4c7c51';

// Configure default wallets
const { wallets } = getDefaultWallets({
  appName: 'Podcast NFT Minter',
  projectId,
});

// Set up connectors for the wallets
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet,
      trustWallet,
      ledgerWallet,
    ],
  },
], {
  appName: 'Podcast NFT Minter',
  projectId,
});

// Create the Wagmi configuration
// This includes:
// - Supported chains (Arbitrum, Mainnet, Sepolia)
// - HTTP transports for each chain
// - Wallet connectors
const config = createConfig({
  chains: [arbitrum, mainnet, sepolia],
  transports: {
    [arbitrum.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors,
});

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

// Main Web3 Provider component
// Wraps the application with necessary Web3 providers
export function Web3Provider({ children }: { children: React.ReactNode }) {
  // Handle client-side mounting to prevent hydration issues
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#001f3f',
            accentColorForeground: 'white',
          })}
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 