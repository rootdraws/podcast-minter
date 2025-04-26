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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http, useAccount } from 'wagmi';
import { mainnet, arbitrum, sepolia } from 'wagmi/chains';

// WalletConnect Project ID - used for connecting to various wallets
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

console.log('WalletConnect Project ID:', projectId);

if (!projectId) {
  console.error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set in environment variables');
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set');
}

// Configure default wallets
const { wallets } = getDefaultWallets({
  appName: 'Podcast NFT Minter',
  projectId,
});

// Set up connectors for the wallets
const connectors = connectorsForWallets(wallets, {
  appName: 'Podcast NFT Minter',
  projectId,
});

// Create the Wagmi configuration
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

// Authentication wrapper component
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isConnecting } = useAccount();

  if (isConnecting) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
}

// Main Web3 Provider component
// Wraps the application with necessary Web3 providers
export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#001f3f',
            accentColorForeground: 'white',
          })}
        >
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 