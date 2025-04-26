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
  const [config, setConfig] = React.useState<any>(null);

  React.useEffect(() => {
    setMounted(true);
    
    // Only initialize config after mount to ensure environment variables are available
    const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
    const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

    if (!projectId || !alchemyApiKey) {
      console.error('Missing required environment variables');
      return;
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

    const wagmiConfig = createConfig({
      chains: [arbitrum, mainnet, sepolia],
      transports: {
        [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
      },
      connectors,
    });

    setConfig(wagmiConfig);
  }, []);

  if (!mounted || !config) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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