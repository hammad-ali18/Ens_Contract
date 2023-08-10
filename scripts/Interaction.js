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

let name="hammad.eth";
let globalENS;
let globalBase;
let globalEthregcontroller;
let globalRentPrice;
async function main(){
    //running all the functions of test.js from commit to register

    //but first we have to deploy the contracts as well




    // ENS = await ethers.getContractAt("ENSRegistry");
    // let ens = await ENS.deploy()
    // console.log("ENS test: ",ens.address);
  
//     pubresolver = await ethers.getContractAt("PublicResolver")
//     pubres = await pubresolver.deploy(ens.address,ZERO_ADDRESS);
//     console.log("Public Resolver test: ", pubres.address);
    
//     fifsregistrar = await ethers.getContractAt("FIFSRegistrar")
//     fifsreg = await fifsregistrar.deploy(ens.address, namehash.hash(tld))
//     console.log("FIFS Registar test: ",fifsreg.address)
    
//     reverseRegistrar = await ethers.getContractAt("ReverseRegistrar")
//     revreg = await reverseRegistrar.deploy(ens.address, fifsreg.address);
//     console.log("ReverseRegistar test: ",revreg.address)
  
//     baseRegistrar = await ethers.getContractAt("BaseRegistrarImplementation")
//     basereg = await baseRegistrar.deploy(ens.address,baseNode);
//     console.log("baseRegistrar test: ",basereg.address);
    
//     dummyOracle = await ethers.getContractAt("DummyOracle")
//     dummy = await dummyOracle.deploy(160000000000);
//     console.log("Dummy Oracle test: ",dummy.address);
    
//     exppremiumpriceoracle = await ethers.getContractAt("ExponentialPremiumPriceOracle")
//     exp = await exppremiumpriceoracle.deploy(dummy.address,[0, 0, '20294266869609', '5073566717402', '158548959919'],21);
//     console.log("ExponentialPremiumPriceOracle test: ",exp.address);
    
//     ethregistrarcontroller = await ethers.getContractAt("ETHRegistrarController");
//     ethregcontroller = await ethregistrarcontroller.deploy(basereg.address,exp.address,minCommitmentAge,maxCommitmentAge);
//     console.log("ETHregistrarController test: ",ethregcontroller.address)
 
  
//   console.log("51")
//   let setowner = await ens.setOwner(baseNode,baseRegistrar.address)
  
//   let owneraddress = await ens.owner(baseNode)
//   console.log("owner address: ",owneraddress)

//   let commitment = await ethregistrarcontroller.makeCommitmentWithConfig(name,owneraddress,"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000")
//   console.log("Commitment: ",commitment)
//   await ethregistrarcontroller.commit(commitment);
//   const duration = 604800*5
//   console.log("82")


  //     await waffle.provider.send("evm_setNextBlockTimestamp", [Math.floor(Date.now() / 1000) + 60]);
  //     // Mine a new block with the updated timestamp
// await waffle.provider.send("evm_mine");
    // await provider.send('evm_increaseTime', [61]); // Increase by 60 seconds
    // await provider.send('evm_mine'); // Mine a new block to update the timestamp
    console.log("86")

    
//commenting below and making another function so that we can call individually

    // let setrecords = await ens.setRecord(baseNode,owneraddress,resolver,31536000)
    
    
// let addcontroller = await basereg.addController(ethregcontroller.address)



// let rentprice =  await ethregcontroller.rentPrice(name,duration);
// console.log("rentprice: ", rentprice)
// let register = await ethregcontroller.register(name,owneraddress,duration,"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",{value:rentprice});


// let myens="0x9adac4ff802de6451124066ebbf37ea63a52852fe7f05f543075f60347fabfae"
//    let addressBigNumber = new BigNumber(myens.slice(2),16)

//  id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ethers.BigNumber.from(hash)));

// console.log(" line 139")
// let commitTime = await ethregistrarcontroller.commitments("0x83ddcb8c766de449d2bdd8f7e0649e037d60bf29e793ea44c66d6f5efa5be960");
// console.log("commit Time",commitTime) 

}
// export default func
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


async function deploy(){
  console.log("deploy function called");
  //contractAt

//   ENS = await ethers.getContractAt("ENSRegistry","0x5FbDB2315678afecb367f032d93F642f64180aa3");
//   // console.log(ENS.address);
//   // let ens2 = await ENS.deploy()
//   // console.log(ens2.address);
  
//   basereg = await ethers.getContractAt("BaseRegistrarImplementation","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
//   //  basereg =  await basereg.deploy(ens2.address,baseNode);
//   console.log("basereg: ",basereg.address)
  
//   // console.log(basereg.address);
  
//   dummyOracle = await ethers.getContractAt("DummyOracle","0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
//   // dummy = await dummyOracle.deploy(160000000000);
//   // console.log("Dummy Oracle test: ",dummy.address);
  
//   exppremiumpriceoracle = await ethers.getContractAt("ExponentialPremiumPriceOracle","0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9")
//   // exp = await exppremiumpriceoracle.deploy(dummy.address,[0, 0, '20294266869609', '5073566717402', '158548959919'],21);
//   // console.log("ExponentialPremiumPriceOracle test: ",exp.address);
  
//   ethregcontroller = await ethers.getContractFactory("ETHRegistrarController");//0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// console.log("ethregcontroller: ",ethregcontroller.address)

// let minRegisterationDuration = await ethregcontroller.MIN_REGISTRATION_DURATION();
// console.log("min registeration duration: ",minRegisterationDuration);

  // ethregcontroller = await ethregistrarcontroller.deploy(basereg.address,exp.address,minCommitmentAge,maxCommitmentAge);
  // console.log("ETHregistrarController test: ",ethregcontroller.address)



  //contractFactory

  let ENS = await ethers.getContractFactory("ENSRegistry");
  ens = await ENS.deploy()
  globalENS = ens;
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
  globalBase = basereg;
  console.log("baseRegistrar test: ",basereg.address);
  
  dummyOracle = await ethers.getContractFactory("DummyOracle")
  dummy = await dummyOracle.deploy(160000000000);
  console.log("Dummy Oracle test: ",dummy.address);
  
  exppremiumpriceoracle = await ethers.getContractFactory("ExponentialPremiumPriceOracle")
  exp = await exppremiumpriceoracle.deploy(dummy.address,[0, 0, '20294266869609', '5073566717402', '158548959919'],21);
  console.log("ExponentialPremiumPriceOracle test: ",exp.address);
  
  ethregistrarcontroller = await ethers.getContractFactory("ETHRegistrarController");
  ethregcontroller = await ethregistrarcontroller.deploy(basereg.address,exp.address,minCommitmentAge,maxCommitmentAge);
globalEthregcontroller = ethregcontroller;
  console.log("ETHregistrarController test: ",ethregcontroller.address)
  
}
let ensaddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
let baseregaddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"


async function SetRecord(){
  // ENS = await ethers.getContractAt("ENSRegistry","0x5FbDB2315678afecb367f032d93F642f64180aa3");
//  let ens2 = await ENS.deploy();
//   console.log("ens address: ",ens2.address)
//  baseRegistrar = await ethers.getContractAt("BaseRegistrarImplementation","0x5FbDB2315678afecb367f032d93F642f64180aa3")
//  let basereg =  await baseRegistrar.deploy(ens2.address,baseNode);
//   console.log("base registrar: ", basereg.address);



//  basereg1 = basereg.deploy()



//basereg address
setowner = await globalENS.setOwner(baseNode,"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
  console.log("Set Record Success");    
  // let owneraddress = await ENS.owner(baseNode)
  // console.log("owner address: ",owneraddress)
  
  
  // let commitment = await ethregcontroller.makeCommitmentWithConfig(name,"0xA6597Afd9FE6c91cd096E95A9d9EDDB38E5Eb843","0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000")
  // console.log("Commitment: ",commitment)
  // await ethregcontroller.commit(commitment);




  // resolver =  await ENS.resolver(baseNode)
  // console.log("resolver address: ",resolver)
  // let setrecords = await ENS.setRecord(baseNode,"0xA6597Afd9FE6c91cd096E95A9d9EDDB38E5Eb843",resolver,31536000)

}




async function AddController(){
//  await deploy();


   //ethregcontroller.address

 let addcontroller = await globalBase.addController("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853")
console.log("AddController Success");
}
async function RentPrice(){
// await deploy();
const duration = 604800*5

// ethregcontroller = await ethers.getContractAt("ETHRegistrarController","0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");


let minregduration =  await globalEthregcontroller.MIN_REGISTRATION_DURATION();
console.log("minregistration duration: ",minregduration)
let rentprice = await globalEthregcontroller.rentPrice(name,duration);
console.log("rentprice: ", rentprice)
globalRentPrice = rentprice;
console.log("rent price Success");

}


  async function Register(){

    // await deploy();
    //calling rentprice variable here
 
    const duration = 604800*5

  // ethregcontroller = await ethers.getContractAt("ETHRegistrarController","0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");

reg = await globalEthregcontroller.register(name,"0xA6597Afd9FE6c91cd096E95A9d9EDDB38E5Eb843",duration,"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",{value:globalRentPrice});
console.log("Register Success");
  }
  async function Commitment(){
    // await deploy();
  // ethregcontroller = await ethers.getContractAt("ETHRegistrarController","0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
      let commitTime = await globalEthregcontroller.commit("0x83ddcb8c766de449d2bdd8f7e0649e037d60bf29e793ea44c66d6f5efa5be960");
console.log("commit Time",commitTime)
console.log("commit success") 
  }

  async function callingInteractors(){
  await deploy();
 await SetRecord();
 await AddController();
 await  RentPrice();
 await  Register();
//  await Commitment();
}



// RentPrice();

// Register();
callingInteractors();
// SetRecord();


