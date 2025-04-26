# AlphaGrowth.fun is a Podcast Archive // NFT Minter

AlphaGrowth.Fun is a podcast which explores paths of growth for DeFi Protocols, Infrastructure & Chains.

Podcasts are stored on [BuzzSprout](https://www.buzzsprout.com/).

Each Podcast features artwork by leading creatives on 𝕏, inspired by the branding of the guests.

[An NFT Minting Contract](https://github.com/rootdraws/podcast-nft) is deployed for each episode, just for fun.

The Artwork, and the Episodes themselves are stored on Arweave.

All sales go to directly to the wallet of the artist.

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
