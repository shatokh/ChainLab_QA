export const TEST_TOKEN_SYMBOL = "CLT";
export const TEST_TOKEN_DECIMALS = 18n;
export const FAUCET_CLAIM_AMOUNT = 100n * 10n ** TEST_TOKEN_DECIMALS;
export const INITIAL_FAUCET_BALANCE = 1_000n * 10n ** TEST_TOKEN_DECIMALS;

export type FaucetStatus =
  | "idle"
  | "success"
  | "missing_wallet"
  | "empty"
  | "failed";

export type LocalFaucetState = {
  account: string | null;
  balance: bigint;
  faucetBalance: bigint;
  status: FaucetStatus;
  lastMessage: string;
};

export const formatTokenAmount = (amount: bigint): string => {
  const wholeTokens = amount / 10n ** TEST_TOKEN_DECIMALS;
  return `${wholeTokens.toString()} ${TEST_TOKEN_SYMBOL}`;
};

export const createLocalFaucetState = (
  account: string | null,
): LocalFaucetState => ({
  account,
  balance: 0n,
  faucetBalance: INITIAL_FAUCET_BALANCE,
  status: "idle",
  lastMessage: "Local faucet is ready.",
});

export const syncFaucetAccount = (
  state: LocalFaucetState,
  account: string | null,
): LocalFaucetState => {
  if (state.account === account) {
    return state;
  }

  return createLocalFaucetState(account);
};

export const requestFaucetTokens = (
  state: LocalFaucetState,
): LocalFaucetState => {
  if (!state.account) {
    return {
      ...state,
      status: "missing_wallet",
      lastMessage: "Connect a local wallet before requesting tokens.",
    };
  }

  if (state.faucetBalance < FAUCET_CLAIM_AMOUNT) {
    return {
      ...state,
      status: "empty",
      lastMessage: "Local faucet is empty.",
    };
  }

  return {
    ...state,
    balance: state.balance + FAUCET_CLAIM_AMOUNT,
    faucetBalance: state.faucetBalance - FAUCET_CLAIM_AMOUNT,
    status: "success",
    lastMessage: `Received ${formatTokenAmount(FAUCET_CLAIM_AMOUNT)} from the local faucet.`,
  };
};
