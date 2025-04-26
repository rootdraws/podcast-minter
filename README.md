# Podcast NFT Minter

A Next.js application for minting limited edition podcast NFTs on Arbitrum.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your WalletConnect Project ID to .env.local

# Run development server
npm run dev
```

## Tech Stack

- Next.js 15
- Tailwind CSS
- RainbowKit + Wagmi
- shadcn/ui

## Smart Contract

The app expects an NFT contract with:

- `price()`: Current mint price
- `totalSupply()`: Number of minted NFTs
- `maxSupply()`: Maximum supply
- `mint()`: Mint function

## License

MIT
