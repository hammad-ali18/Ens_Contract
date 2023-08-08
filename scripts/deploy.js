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
  
  //running all the functions of test.js from commit to register

  let commitment = await ethregcontroller.makeCommitmentWithConfig(name,owner.address,"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000")
  console.log("Commitment: ",commitment)
  await ethregcontroller.commit(commitment);
  const duration = 604800*5
  console.log("82")
  //     await waffle.provider.send("evm_setNextBlockTimestamp", [Math.floor(Date.now() / 1000) + 60]);
  //     // Mine a new block with the updated timestamp
// await waffle.provider.send("evm_mine");
    await provider.send('evm_increaseTime', [61]); // Increase by 60 seconds
    await provider.send('evm_mine'); // Mine a new block to update the timestamp
    console.log("86")

    
    let setrecords = await ens.setRecord(baseNode,owner.address,resolver,31536000)
    
    
let addcontroller = await basereg.addController(ethregcontroller.address)



let rentprice =  await ethregcontroller.rentPrice(name,duration);
console.log("rentprice: ", rentprice)
let register = await ethregcontroller.register(name,owner.address,duration,"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",{value:rentprice});


// let myEns="0x9adac4ff802de6451124066ebbf37ea63a52852fe7f05f543075f60347fabfae"
//    let addressBigNumber = new BigNumber(myEns.slice(2),16)

//  id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ethers.BigNumber.from(hash)));

console.log(" line 139")
let commitTime = await ethregcontroller.commitments("0x83ddcb8c766de449d2bdd8f7e0649e037d60bf29e793ea44c66d6f5efa5be960");
console.log("commit Time",commitTime)      
 

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