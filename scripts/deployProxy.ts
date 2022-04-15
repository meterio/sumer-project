import { ethers, upgrades, network } from 'hardhat';
import { saveFile } from './helper';

export const deployProxy = async (name, symbol, initialSupply, owner) => {
  const _token = await ethers.getContractFactory('ERC20MintablePauseableUpgradeable');

  const token = await upgrades.deployProxy(_token, [name, symbol, initialSupply, owner], {
    initializer: 'initialize',
  });
  await token.deployed();
  console.log('Deploying:', `ERC20MintablePauseableUpgradeable for ${name}`);
  console.log('  to', token.address);
  console.log('  in', token.deployTransaction.hash);
  await saveFile(network.name, 'ERC20MintablePauseableUpgradeable', token, [name, symbol, initialSupply, owner], {});
};
