const hre = require("hardhat");

async function main() {
  const fauna = await hre.ethers.deployContract("Fauna");

  await fauna.waitForDeployment();

  console.log(`Fauna deployed to ${fauna.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
