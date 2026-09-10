# TxStory

**Every transaction has a story.**

TxStory is a comprehensive Web3 transaction intelligence application. Instead of displaying cryptic raw hex data, logs, and hashes, TxStory analyzes on-chain activity and transforms complex blockchain transactions into clear, human-readable stories. 

## Features

- **Human-Readable Explanations**: Converts complex transaction logs into plain English.
- **Multi-Chain Support**: Currently supports Ethereum, Base, and Binance Smart Chain (BSC).
- **Asset Movement Tracking**: Automatically detects and details native and token transfers.

## Architecture

This project is a monorepo containing:
- `apps/web`: React + Vite + Tailwind frontend.
- `apps/api`: Node.js + Express + Prisma (MongoDB) backend.
- `packages/shared`: Shared types and schemas.

## Setup Instructions

### 1. Install dependencies
From the root of the project, run:
```bash
npm install
```

### 2. Environment Variables
Copy the example environment files to set up your local configuration:
- Copy `.env.example` to `.env` in the root (and in `apps/api` and `apps/web` as needed).
- Update the variables to match your local setup:
  - `DATABASE_URL`: Your MongoDB connection string.
  - `BASE_RPC_URL`: RPC endpoint for the Base network.
  - `ETH_RPC_URL`: RPC endpoint for Ethereum Mainnet.
  - `BSC_RPC_URL`: RPC endpoint for Binance Smart Chain.
  - `VITE_API_URL`: Points to your local API (default: `http://localhost:8700/api/v1`).

### 3. Database Setup
Initialize the database using Prisma:
```bash
cd apps/api
npx prisma generate
```
*(Ensure your MongoDB instance is running before proceeding with any operations)*

### 4. Local Development
From the root of the project, start the application:
```bash
npm run dev
```
This will start both the API server (default port 8700) and the Vite frontend simultaneously.

## Contributing

### Adding a Protocol Adapter
Protocol adapters live in `apps/api/src/modules/transaction/protocols/`.
Create a new file implementing the `ProtocolRegistry` interface to parse specific contract interactions.

### Adding a New Blockchain Provider
Blockchain providers are in `apps/api/src/modules/transaction/providers/`.
Implement the `IBlockchainProvider` interface to support a new chain.

## Testing

Run tests across the workspace:
```bash
npm run test
```
