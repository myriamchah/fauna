require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
      url: vars.get("SEPOLIA_RPC_URL"),
      accounts: [vars.get("SEPOLIA_WALLET_PK")],
    },
  },
};
