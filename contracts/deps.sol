//SPDX-License-Identifier: MIT
// These imports are here to force Hardhat to compile contracts we depend on in our tests but don't need anywhere else.
import "@ensdomains/ens-contracts/contracts/registry/ENSRegistry.sol";
import "@ensdomains/ens-contracts/contracts/registry/FIFSRegistrar.sol";
import "@ensdomains/ens-contracts/contracts/resolvers/PublicResolver.sol";
import '@ensdomains/ens-contracts/contracts/registry/ENS.sol';
import "@ensdomains/ens-contracts/contracts/ethregistrar/BaseRegistrarImplementation.sol";
import "@ensdomains/ens-contracts/contracts/ethregistrar/ETHRegistrarController.sol";
import "@ensdomains/ens-contracts/contracts/ethregistrar/DummyOracle.sol";
import "@ensdomains/ens-contracts/contracts/ethregistrar/ExponentialPremiumPriceOracle.sol";
import "@ensdomains/ens-contracts/contracts/wrapper/StaticMetadataService.sol";
// import "@ensdomains/ens-contracts/contracts/wrapper/NameWrapper.sol";


