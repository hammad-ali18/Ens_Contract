const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const { BaseRegistrar, BaseRegistrarImplementation, PriceOracle, DummyOracle, AggregatorInterface, StablePriceOracle } = require("@ensdomains/ens-contracts");
const tld = "test";
// const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
const baseNode ="0x84ef65b3506f5b54a01171c1a50a4b6f269e1a8112d7764e49a36185ebeb3d07";

const minCommitmentAge=60
const maxCommitmentAge=3600
const provider = waffle.provider;

// const ethers = require('ethers');

const name  = 'hammad.eth';
async function main() {
 
  ENS = await ethers.getContractFactory("ENSRegistry");
  ens = await ENS.deploy()
  console.log("ENS test: ",ens.address);

  pubresolver = await ethers.getContractFactory("PublicResolver")
  pubres = await pubresolver.deploy(ens.address,ZERO_ADDRESS);
  console.log("Public Resolver test: ", pubres.address);
  
  fifsregistrar = await ethers.getContractFactory("FIFSRegistrar")
  fifsreg = await fifsregistrar.deploy(ens.address, namehash.hash(tld))
  console.log("FIFS Registar test: ",fifsreg.address)
  
  reverseRegistrar = await ethers.getContractFactory("ReverseRegistrar")
  revreg = await reverseRegistrar.deploy(ens.address, fifsreg.address);
  console.log("ReverseRegistar test: ",revreg.address)

  baseRegistrar = await ethers.getContractFactory("BaseRegistrarImplementation")
  basereg = await baseRegistrar.deploy(ens.address,baseNode);
  console.log("baseRegistrar test: ",basereg.address);
  
  dummyOracle = await ethers.getContractFactory("DummyOracle")
  dummy = await dummyOracle.deploy(160000000000);
  console.log("Dummy Oracle test: ",dummy.address);
  
  exppremiumpriceoracle = await ethers.getContractFactory("ExponentialPremiumPriceOracle")
  exp = await exppremiumpriceoracle.deploy(dummy.address,[0, 0, '20294266869609', '5073566717402', '158548959919'],21);
  console.log("ExponentialPremiumPriceOracle test: ",exp.address);
  
  ethregistrarcontroller = await ethers.getContractFactory("ETHRegistrarController");
  ethregcontroller = await ethregistrarcontroller.deploy(basereg.address,exp.address,minCommitmentAge,maxCommitmentAge);
  console.log("ETHregistrarController test: ",ethregcontroller.address)
  
  console.log("51")
  let setowner = await ens.setOwner(baseNode,basereg.address)
  
  let owneraddress = await ens.owner(baseNode)
  console.log("owner address: ",owner.address)
  
       
 

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

async function  func () {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  let oracleAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
  if (network.name !== 'mainnet') {
    const dummyOracle = await deploy('DummyOracle', {
      from: deployer,
      args: ['160000000000'],
      log: true,
    })
    oracleAddress = dummyOracle.address
  }

  await deploy('ExponentialPremiumPriceOracle', {
    from: deployer,
    args: [
      oracleAddress,
      [0, 0, '20294266869609', '5073566717402', '158548959919'],
      21,
    ],
    log: true,
  })
}

func.id = 'price-oracle'
func.tags = ['ethregistrar', 'ExponentialPremiumPriceOracle', 'DummyOracle']
func.dependencies = ['registry']

// export default func
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });