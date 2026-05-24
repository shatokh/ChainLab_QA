export const LOCAL_HARDHAT_CHAIN_ID = 31337;
export const LOCAL_HARDHAT_CHAIN_HEX = "0x7a69";

export type WalletStatus =
  | "idle"
  | "connected"
  | "wrong_chain"
  | "missing_provider"
  | "rejected"
  | "failed";

export type WalletState = {
  status: WalletStatus;
  account: string | null;
  shortAccount: string | null;
  chainId: number | null;
  chainLabel: string | null;
  message: string;
};

export type Eip1193Provider = {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
};

type ProviderError = Error & {
  code?: number;
};

type WalletWindow = Window &
  typeof globalThis & {
    ethereum?: Eip1193Provider;
    chainLabMockProvider?: Eip1193Provider;
  };

export const initialWalletState = (): WalletState => ({
  status: "idle",
  account: null,
  shortAccount: null,
  chainId: null,
  chainLabel: null,
  message: "Wallet is not connected.",
});

export const disconnectWallet = (): WalletState => initialWalletState();

export const shortenAddress = (address: string): string => {
  if (address.length <= 12) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const normalizeChainId = (chainId: string | number): number => {
  if (typeof chainId === "number") {
    return chainId;
  }

  if (chainId.startsWith("0x")) {
    return Number.parseInt(chainId, 16);
  }

  return Number.parseInt(chainId, 10);
};

export const getChainLabel = (chainId: number): string => {
  if (chainId === LOCAL_HARDHAT_CHAIN_ID) {
    return "Local Hardhat (31337)";
  }

  return `Unsupported chain (${chainId})`;
};

export const getBrowserWalletProvider = (): Eip1193Provider | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const walletWindow = window as WalletWindow;
  return walletWindow.chainLabMockProvider ?? walletWindow.ethereum;
};

export const connectWallet = async (
  provider: Eip1193Provider | undefined,
): Promise<WalletState> => {
  if (!provider) {
    return {
      ...initialWalletState(),
      status: "missing_provider",
      message: "No wallet provider found.",
    };
  }

  try {
    const accounts = await provider.request({ method: "eth_requestAccounts" });

    if (!Array.isArray(accounts) || typeof accounts[0] !== "string") {
      return {
        ...initialWalletState(),
        status: "failed",
        message: "Wallet did not return an account.",
      };
    }

    const rawChainId = await provider.request({ method: "eth_chainId" });

    if (typeof rawChainId !== "string" && typeof rawChainId !== "number") {
      return {
        ...initialWalletState(),
        status: "failed",
        account: accounts[0],
        shortAccount: shortenAddress(accounts[0]),
        message: "Wallet did not return a valid chain.",
      };
    }

    const chainId = normalizeChainId(rawChainId);
    const chainLabel = getChainLabel(chainId);
    const baseState = {
      account: accounts[0],
      shortAccount: shortenAddress(accounts[0]),
      chainId,
      chainLabel,
    };

    if (chainId !== LOCAL_HARDHAT_CHAIN_ID) {
      return {
        ...baseState,
        status: "wrong_chain",
        message: "Switch to Local Hardhat (31337).",
      };
    }

    return {
      ...baseState,
      status: "connected",
      message: "Wallet connected to Local Hardhat.",
    };
  } catch (error) {
    const providerError = error as ProviderError;

    if (providerError.code === 4001) {
      return {
        ...initialWalletState(),
        status: "rejected",
        message: "Wallet connection was rejected.",
      };
    }

    return {
      ...initialWalletState(),
      status: "failed",
      message: "Wallet connection failed.",
    };
  }
};
