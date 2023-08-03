const { BigNumber } = require('bignumber.js')
const { expect } = require("chai");
const { reverse } = require("dns");
const { poll} = require("ethers/lib/utils");
const { waffle,ethers } = require("hardhat");
const { userInfo } = require("os");
const { register } = require("ts-node");
const provider = waffle.provider;


// const Web3 = require('web3');
// const web3 = new Web3();
const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const { BaseRegistrar, BaseRegistrarImplementation, PriceOracle, DummyOracle, AggregatorInterface, StablePriceOracle,NameWrapper } = require("@ensdomains/ens-contracts");
// const exp = require("constants");
const tld = "test";
// const ethers = hre.ethers;
// const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
const baseNode ="0x84ef65b3506f5b54a01171c1a50a4b6f269e1a8112d7764e49a36185ebeb3d07";

const minCommitmentAge=60
const maxCommitmentAge=3600

// const ethers = require('ethers');

const name  = 'hammad.eth';

describe('Testing ENS Contracts', () =>{

    const [owner, accountOne] = provider.getWallets();


    before( async () =>{
        Greeter = await ethers.getContractFactory("Greeter");
        greeter = await Greeter.deploy("Hello World");
        
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
        
        
        //deploying staticMetadataService
        staticmetadataservice = await ethers.getContractFactory("StaticMetadataService")
        metadata =  await staticmetadataservice.deploy("ens-metadata-service.appspot.com/name/0x{id}")
        console.log("meta-data-uri: ",metadata.address)
        
        
        
        
        namewrapper  = await ethers.getContractFactory("NameWrapper")
        
        
        
        namewrap = await namewrapper.deploy(ens.address,basereg.address,metadata.address)
        console.log("NameWrapper test: ",namewrap.address)
     resolver =  await ens.resolver(baseNode)
        console.log("resolver address: ",resolver)

        
        
        
        
        
        
    })
    
    it('Register a Domain', async () =>{
        
        
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


console.log("96")
let setowner = await ens.setOwner(baseNode,basereg.address)

let owneraddress = await ens.owner(baseNode)
console.log("owner address: ",owner.address)

let rentprice =  await ethregcontroller.rentPrice(name,duration);
console.log("rentprice: ", rentprice)
let register = await ethregcontroller.register(name,owner.address,duration,"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",{value:rentprice});


// let myEns="0x9adac4ff802de6451124066ebbf37ea63a52852fe7f05f543075f60347fabfae"
//    let addressBigNumber = new BigNumber(myEns.slice(2),16)

//  id = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ethers.BigNumber.from(hash)));

console.log(" line 139")
let commitTime = await ethregcontroller.commitments("0x83ddcb8c766de449d2bdd8f7e0649e037d60bf29e793ea44c66d6f5efa5be960");
console.log("commit Time",commitTime)      

//               let register = await ethregcontroller.register(name,owner.address,duration,"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef");
// console.log(register)


})

it('Register a Sub Domain', async () =>{
   let hash  = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    console.log("hash of ens name: ",hash)

    let id =ethers.utils.defaultAbiCoder.encode(['uint256'],[ethers.BigNumber.from(hash)]);
     
        
        console.log("id: ",id)
        
        subname = "subMuhammad"
        label =  ethers.utils.keccak256(ethers.utils.toUtf8Bytes(subname));
        //can find this function on Activity of MetaMask, this setSubnodeRecord() is on NameWrapper
        console.log("Subdomain name: ", label)
        // setsubnoderecord = await   namewrap.setSubnodeRecord(hash,label,owner.address,resolver,31536000)
        // console.log(setsubnoderecord)

        subnode = ethers.utils.solidityKeccak256(['bytes32','bytes32'],[baseNode, id]);
        console.log("testsubnode: ",subnode)
        console.log("103")

setsubnoderecord = await ens.setSubnodeRecord(subnode,label,owner.address,resolver,31536000)
    })

   
})