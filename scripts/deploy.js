const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const { BaseRegistrar, BaseRegistrarImplementation, PriceOracle } = require("@ensdomains/ens-contracts");
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() {
  const ENSRegistry = await ethers.getContractFactory("ENSRegistry")
  const FIFSRegistrar = await ethers.getContractFactory("FIFSRegistrar")
  const ReverseRegistrar = await ethers.getContractFactory("ReverseRegistrar")
  const PublicResolver = await ethers.getContractFactory("PublicResolver")

  const BaseRegistrarImplementation = await ethers.getContractFactory("BaseRegistrarImplementation")
  const ETHRegistrarController = await ethers.getContractFactory("ETHRegistrarController")
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ens = await ENSRegistry.deploy()
  await ens.deployed()
  console.log("ens address: ",ens.address)//ens address


  const resolver = await PublicResolver.deploy(ens.address, ZERO_ADDRESS);
  await resolver.deployed()
  console.log("Resolver Address: ",resolver.address)//resolver address


  await setupResolver(ens, resolver, accounts)
  const registrar = await  FIFSRegistrar.deploy(ens.address, namehash.hash(tld));
  await registrar.deployed()
  console.log("Registrar address Address: ",registrar.address)//resolver address

  await setupRegistrar(ens, registrar);
  const reverseRegistrar = await ReverseRegistrar.deploy(ens.address, resolver.address);
  await reverseRegistrar.deployed()
  
  await setupReverseRegistrar(ens, registrar, reverseRegistrar, accounts);
  console.log("Reverse Registrar Address: ",reverseRegistrar.address)//reverse Registrar address

 const baseNode ="0x84ef65b3506f5b54a01171c1a50a4b6f269e1a8112d7764e49a36185ebeb3d07"

 const baseRegistrarImplementation = await BaseRegistrarImplementation.deploy(ens.address,baseNode)
 console.log("BaseRegistrarImplementation Address: ",baseRegistrarImplementation.address);

 const minCommitmentAge=60
 const maxCommitmentAge=3600
 

 const base="0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"
 const prices ="0xB9d374d0fE3D8341155663FaE31b7BeAe0aE233A"
 const ethRegistrarController = await ETHRegistrarController.deploy(base,prices,minCommitmentAge,maxCommitmentAge);
 console.log("ETHRegistrarController Address: ",ethRegistrarController.address)
 

};

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = labelhash("resolver");
  await ens.setSubnodeOwner(ZERO_HASH, resolverLabel, accounts[0]);
  await ens.setResolver(resolverNode, resolver.address);
  await resolver['setAddr(bytes32,address)'](resolverNode, resolver.address);
}

async function setupRegistrar(ens, registrar) {
  await ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), registrar.address);
}

async function setupReverseRegistrar(ens, registrar, reverseRegistrar, accounts) {
  await ens.setSubnodeOwner(ZERO_HASH, labelhash("reverse"), accounts[0]);
  await ens.setSubnodeOwner(namehash.hash("reverse"), labelhash("addr"), reverseRegistrar.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });