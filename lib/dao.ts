export const DAO_PROPOSAL_TITLE = "Ship local DAO voting";
export const DAO_PROPOSAL_DESCRIPTION =
  "Validate yes/no voting on local Hardhat.";

export type DaoVoteChoice = "yes" | "no";

export type DaoVotingStatus =
  | "idle"
  | "success"
  | "missing_wallet"
  | "duplicate_vote"
  | "failed";

export type LocalDaoProposal = {
  id: number;
  title: string;
  description: string;
  yesVotes: number;
  noVotes: number;
  status: "open";
};

export type LocalDaoVotingState = {
  account: string | null;
  proposal: LocalDaoProposal;
  userVote: DaoVoteChoice | null;
  status: DaoVotingStatus;
  lastMessage: string;
};

export const createLocalDaoVotingState = (
  account: string | null,
): LocalDaoVotingState => ({
  account,
  proposal: {
    id: 1,
    title: DAO_PROPOSAL_TITLE,
    description: DAO_PROPOSAL_DESCRIPTION,
    yesVotes: 0,
    noVotes: 0,
    status: "open",
  },
  userVote: null,
  status: "idle",
  lastMessage: "Local DAO proposal is ready.",
});

export const castLocalDaoVote = (
  state: LocalDaoVotingState,
  choice: DaoVoteChoice,
): LocalDaoVotingState => {
  if (!state.account) {
    return {
      ...state,
      status: "missing_wallet",
      lastMessage: "Connect a local wallet before voting.",
    };
  }

  if (state.userVote) {
    return {
      ...state,
      status: "duplicate_vote",
      lastMessage: "This local account already voted.",
    };
  }

  return {
    ...state,
    proposal: {
      ...state.proposal,
      yesVotes:
        choice === "yes"
          ? state.proposal.yesVotes + 1
          : state.proposal.yesVotes,
      noVotes:
        choice === "no" ? state.proposal.noVotes + 1 : state.proposal.noVotes,
    },
    userVote: choice,
    status: "success",
    lastMessage: `Your local ${choice} vote was recorded.`,
  };
};
