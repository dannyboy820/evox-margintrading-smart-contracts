// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(0);

  console.log("Deploying contracts with the account:", deployer.address);

  const DH = "0xb6f53a0D9932281e38056961A7afAecD6846418D"
  const ex = "0x82C19528944441bF4703C0f4bb4356521eC526ff"
  const int = "0xaF8749DA37232f2bbf3375642079841DCeEE0a4A"
  const initialOwner = deployer.address // insert wallet address 

  const depositVault = await hre.ethers.getContractFactory("DepositVault", {
    libraries: {
      REX_LIBRARY: "0x383B5bD0FCc3df5c3965211aD811e2Af6Fd2Fd8E",
    },
  });
  const Deploy_depositVault = await depositVault.deploy(initialOwner, DH, ex, int);

  await Deploy_depositVault.waitForDeployment();

  console.log("Deposit Vault deployed to", await Deploy_depositVault.getAddress());


}
//npx hardhat run scripts/deploy.js --network mumbai
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
