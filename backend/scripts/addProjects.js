const hre = require("hardhat");

async function addProjects() {
  const Fauna = await ethers.getContractFactory("Fauna");
  const fauna = Fauna.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");

  await fauna.addCuratedProject(
    "Sea Shepherd",
    "Reparations on a boat",
    "0x4ab035a05e491f322be28de885f50d1f7b2fd343"
  );
  await fauna.addCuratedProject(
    "Sun Bear CC",
    "Rescue a new bear",
    "0xa305d0d26716f7509e00285439b489e78dbb8335"
  );

  const proj1 = await fauna.getProject(0);
  const proj2 = await fauna.getProject(1);

  console.log(`Projects added : ${proj1.name}, ${proj2.name}`);
}

addProjects().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
