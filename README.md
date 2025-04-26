# AlphaGrowth.fun is a Podcast Archive // NFT Minter

Podcasts are stored on [BuzzSprout](https://www.buzzsprout.com/).

Each Episode has artwork which is thematically associated with the guest of the episode. Artwork is created by leading creatives on 𝕏, and then minted on a Blockchain which best represents the guests for that Episode.

The Arbitrum Podcast, is minted on Arbitrum.

The Artwork, and the Episodes themselves are stored on Arweave.

When each episode is published, a limited edition is released just for fun.

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
