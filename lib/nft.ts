export const NFT_COLLECTION_NAME = "ChainLab Local NFT";
export const NFT_SYMBOL = "CLNFT";
export const NFT_BASE_TOKEN_URI = "chainlab://local-nft/";

export type NftMintStatus = "idle" | "success" | "missing_wallet" | "failed";

export type LocalMintedNft = {
  tokenId: number;
  owner: string;
  tokenUri: string;
};

export type LocalNftMintState = {
  account: string | null;
  collectionName: string;
  symbol: string;
  nextTokenId: number;
  mintedTokens: LocalMintedNft[];
  status: NftMintStatus;
  lastMessage: string;
};

export const createLocalNftMintState = (
  account: string | null,
): LocalNftMintState => ({
  account,
  collectionName: NFT_COLLECTION_NAME,
  symbol: NFT_SYMBOL,
  nextTokenId: 1,
  mintedTokens: [],
  status: "idle",
  lastMessage: "Local NFT mint is ready.",
});

export const mintLocalNft = (state: LocalNftMintState): LocalNftMintState => {
  if (!state.account) {
    return {
      ...state,
      status: "missing_wallet",
      lastMessage: "Connect a local wallet before minting an NFT.",
    };
  }

  const mintedNft: LocalMintedNft = {
    tokenId: state.nextTokenId,
    owner: state.account,
    tokenUri: `${NFT_BASE_TOKEN_URI}${state.nextTokenId}`,
  };

  return {
    ...state,
    nextTokenId: state.nextTokenId + 1,
    mintedTokens: [...state.mintedTokens, mintedNft],
    status: "success",
    lastMessage: `Minted ${NFT_SYMBOL} #${mintedNft.tokenId} locally.`,
  };
};
