const AvastarPrintRegistry = artifacts.require("AvastarPrintRegistry");
const AvastarPrintRegistryMinter = artifacts.require("AvastarPrintRegistryMinter");

module.exports = function(deployer) {
  //deployer.deploy(AvastarPrintRegistry,"0x89447f2Ca722481d1399ae08b4d7E9471883F6c8" , "250000000000000000", "100000000000000000", "1000000000000000000", "300000000000000000", "110000000000000000", "1000000000000000000", "http://apr.artblocks.io/details/","Avastar Print Registry","APR");

  deployer.deploy(AvastarPrintRegistry,"0x89447f2Ca722481d1399ae08b4d7E9471883F6c8" , "25000000000000", "10000000000000", "100000000000000", "30000000000000", "11000000000000", "150000000000000", "","","");
  deployer.deploy(AvastarPrintRegistryMinter,"0x89447f2Ca722481d1399ae08b4d7E9471883F6c8", "0x89447f2Ca722481d1399ae08b4d7E9471883F6c8","0xF3E778F839934fC819cFA1040AabaCeCBA01e049");
};
