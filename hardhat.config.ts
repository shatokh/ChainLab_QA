import { defineConfig } from "hardhat/config";

export default defineConfig({
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
    },
  },
  networks: {
    localHardhat: {
      type: "edr-simulated",
      chainType: "l1",
      chainId: 31337,
    },
  },
});
