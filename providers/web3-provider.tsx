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

// Define Unichain
const unichain = {
  id: 130,
  name: 'Unichain',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet.unichain.org'] },
  },
  blockExplorers: {
    default: { name: 'UniScan', url: 'https://uniscan.xyz/' },
  }
} as const;

// Declare the litConfig property on Window
declare global {
  interface Window {
    litConfig?: {
      debug: boolean;
      devMode: boolean;
    };
  }
}

// Suppress Lit dev mode warning
if (typeof window !== 'undefined') {
  window.litConfig = {
    debug: false,
    devMode: false
  };
}

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

// Script loading configuration
const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Authentication wrapper component
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isConnecting } = useAccount();

  if (isConnecting) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
}

// Error boundary for Web3 initialization
function Web3ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Web3 Connection Error</h2>
          <p className="mb-4">Please try refreshing the page or check your wallet connection.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Main Web3 Provider component
export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [config, setConfig] = React.useState<any>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (config) return; // Prevent double initialization
    
    try {
      setMounted(true);
      
      const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
      const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

      if (!projectId || !alchemyApiKey) {
        throw new Error('Missing required environment variables');
      }

      // Get the current URL without trailing slash
      const currentUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'http://localhost:3000';

      // Configure default wallets
      const { wallets } = getDefaultWallets({
        appName: 'Podcast NFT Minter',
        projectId,
        appDescription: 'Mint podcast NFTs',
        appUrl: currentUrl,
        appIcon: 'https://your-app-icon.png',
      });

      // Set up connectors for the wallets
      const connectors = connectorsForWallets(wallets, {
        appName: 'Podcast NFT Minter',
        projectId,
      });

      const wagmiConfig = createConfig({
        // Comment out mainnet and arbitrum, add unichain
        chains: [
          // mainnet,
          // arbitrum,
          unichain,
          // sepolia
        ],
        transports: {
          // [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
          // [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
          [unichain.id]: http(`https://unichain-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
          // [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
        },
        connectors,
        ssr: true,
        batch: { multicall: true },
        pollingInterval: 5_000,
      });

      // Handle MetaMask injection and extension communication
      if (typeof window !== 'undefined') {
        // Suppress extension port closure warnings
        const originalError = console.error;
        console.error = (...args) => {
          if (args[0]?.includes('The message port closed before a response was received')) {
            return;
          }
          originalError.apply(console, args);
        };

        // Handle ethereum provider
        if (window.ethereum) {
          try {
            Object.defineProperty(window, 'ethereum', {
              value: window.ethereum,
              writable: false,
              configurable: false,
            });
          } catch (e) {
            console.warn('Failed to set ethereum property:', e);
          }
        }
      }

      setConfig(wagmiConfig);
    } catch (err) {
      console.error('Web3 initialization error:', err);
      setError(err as Error);
    }
  }, [config]);

  // Load external scripts after component mount
  React.useEffect(() => {
    if (mounted) {
      // Add any external scripts that need to be loaded here
      const scripts: string[] = [
        // Add your external script URLs here if needed
      ];

      Promise.all(scripts.map(loadScript))
        .catch(err => console.error('Error loading external scripts:', err));
    }
  }, [mounted]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Web3 Connection Error</h2>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!mounted || !config) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Web3ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#001f3f',
              accentColorForeground: 'white',
            })}
            // Add configuration to handle MetaMask conflicts
            modalSize="compact"
            showRecentTransactions={true}
          >
            <AuthWrapper>
              {children}
            </AuthWrapper>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Web3ErrorBoundary>
  );
} 