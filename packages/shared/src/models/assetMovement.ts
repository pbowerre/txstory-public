export type AssetMovementType = 'NATIVE' | 'ERC20' | 'ERC721' | 'ERC1155';

export interface BaseMovement {
  type: AssetMovementType;
  /** The address sending the asset */
  from: string;
  /** The address receiving the asset */
  to: string;
  /** The contract address of the token (for native, this is usually '0x0000000000000000000000000000000000000000' or similar) */
  contractAddress: string;
}

export interface NativeMovement extends BaseMovement {
  type: 'NATIVE';
  /** The amount of native token (e.g. ETH/BASE) moved, in wei */
  amount: bigint;
}

export interface ERC20Movement extends BaseMovement {
  type: 'ERC20';
  /** The amount of ERC20 token moved, in wei/smallest unit */
  amount: bigint;
}

export interface ERC721Movement extends BaseMovement {
  type: 'ERC721';
  /** The ID of the NFT moved */
  tokenId: bigint;
}

export interface ERC1155Movement extends BaseMovement {
  type: 'ERC1155';
  /** The ID of the token moved */
  tokenId: bigint;
  /** The amount of the specific token ID moved */
  amount: bigint;
}

export type AssetMovement = NativeMovement | ERC20Movement | ERC721Movement | ERC1155Movement;
