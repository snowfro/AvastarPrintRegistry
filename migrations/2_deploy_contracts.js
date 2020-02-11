const AvastarPrintRegistry = artifacts.require("AvastarPrintRegistry");

module.exports = function(deployer) {
  deployer.deploy(AvastarPrintRegistry,"0x89447f2Ca722481d1399ae08b4d7E9471883F6c8" , "250000000000000000", "100000000000000000", "1000000000000000000", "300000000000000000", "110000000000000000", "1000000000000000000", "http://apr.artblocks.io/details/","Avastar Print Registry","APR");
};
